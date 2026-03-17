import { filter, startsWith, reverse } from 'ramda';
import { StateBuilder } from './state-builder';
import { parseCode } from '../utils';
import { PST, File, Rank } from '../presets';

class AI {
  static #PST = {
    wP: PST.P,
    bP: reverse(PST.P),
    wN: PST.N,
    bN: PST.N,
    wB: PST.B,
    bB: reverse(PST.B),
    wR: PST.R,
    bR: reverse(PST.R),
    wQ: PST.Q,
    bQ: reverse(PST.Q),
    wK: PST.K,
    bK: reverse(PST.K),
  };

  static #Scores = {
    P: 100,
    N: 320,
    B: 330,
    R: 500,
    Q: 900,
    K: 20000,
  };

  // ── Pre-computed lookup tables ─────────────────────────────────────────────
  // Replaces the expensive flip(indexOf)(Rank) / flip(indexOf)(File) calls.
  // Rank array is [8,7,6,5,4,3,2,1] so rank '8' → index 0, rank '1' → index 7.
  static #rankToIdx = (() => {
    const m = {};
    Rank.forEach((r, i) => {
      m[String(r)] = i;
    });

    return m;
  })();

  // File array is ['a','b',...,'h'] so file 'a' → index 0, 'h' → index 7.
  static #fileToIdx = (() => {
    const m = {};
    File.forEach((f, i) => {
      m[f] = i;
    });

    return m;
  })();

  // ── Transposition Table ────────────────────────────────────────────────────
  // Caches minimax results so identical positions reached via different move
  // orders are not re-evaluated.  Stored per-search; cleared by clearSearchState().
  static #tt = new Map();
  static #TT_MAX_SIZE = 500000;

  // flag values stored in TT entries
  static #TT_EXACT = 0; // score is within [alpha, beta] – fully reliable
  static #TT_LOWERBOUND = 1; // score caused a beta-cutoff (true value >= score)
  static #TT_UPPERBOUND = 2; // all moves failed low   (true value <= score)

  // ── Killer Move Heuristic ──────────────────────────────────────────────────
  // Quiet moves that caused a beta-cutoff at a given depth.  Trying them early
  // in sibling nodes improves alpha-beta pruning without reducing strength.
  // killers[depth] = [primaryKillerId, secondaryKillerId]
  static #killers = [];

  /**
   * Reset all search-specific state.
   * Call once at the beginning of each CPU turn (before kicking off minimax).
   */
  static clearSearchState() {
    this.#tt.clear();
    this.#killers = [];
  }

  // ── Killer helpers ─────────────────────────────────────────────────────────

  /**
   * Build a compact move identifier from the last two entries in state.node.
   * Format: "<fromTile><toTile>" e.g. "e2e4".
   * @param {object} state
   * @return {string}
   */
  static #getMoveId(state) {
    const node = state.node;
    const n = node.length;

    // node entries are pKey+tile strings like "wPe2"; slice(2) extracts the tile.
    return node[n - 2].slice(2) + node[n - 1].slice(2);
  }

  /**
   * Bonus score for a quiet move that matches a killer at the given depth.
   * @param {object} state
   * @param {number} depth
   * @return {number}
   */
  static #killerScore(state, depth) {
    if (depth < 0) {
      return 0;
    }
    const killers = this.#killers[depth];
    if (!killers) {
      return 0;
    }
    const moveId = this.#getMoveId(state);
    if (killers[0] === moveId) {
      return 900;
    }
    if (killers[1] === moveId) {
      return 800;
    }

    return 0;
  }

  /**
   * Record a quiet move that caused a beta-cutoff as a killer for this depth.
   * @param {object} state  - the move that triggered the cutoff
   * @param {number} depth
   */
  static #storeKiller(state, depth) {
    if (state.isCaptured) {
      return; // only quiet moves serve as killers
    }
    const moveId = this.#getMoveId(state);
    if (!this.#killers[depth]) {
      this.#killers[depth] = [null, null];
    }
    const killers = this.#killers[depth];
    if (killers[0] !== moveId) {
      killers[1] = killers[0];
      killers[0] = moveId;
    }
  }

  // ── MVV-LVA ────────────────────────────────────────────────────────────────

  /**
   * Most Valuable Victim – Least Valuable Attacker score.
   * Higher = capture this first (e.g. pawn takes queen = +800).
   * @param {object} state
   * @return {number}
   */
  static #mvvLva(state) {
    const { piece: victimPiece } = parseCode(state.pretendCode);
    const attackerCode = state.node[state.node.length - 2];
    const { piece: attackerPiece } = parseCode(attackerCode);

    return this.#Scores[victimPiece] - this.#Scores[attackerPiece];
  }

  /**
   * Sort moves: captures (ordered by MVV-LVA) → killer moves → quiet moves.
   * The optional depth parameter enables the killer-move heuristic.
   * @param {Array}  stateList
   * @param {number} [depth=-1]
   * @return {Array}
   */
  static orderMoves(stateList, depth = -1) {
    return [...stateList].sort((a, b) => {
      const aScore = a.isCaptured
        ? 2000 + this.#mvvLva(a)
        : this.#killerScore(a, depth);
      const bScore = b.isCaptured
        ? 2000 + this.#mvvLva(b)
        : this.#killerScore(b, depth);

      return bScore - aScore;
    });
  }

  // ── Pawn structure evaluation ──────────────────────────────────────────────

  /**
   * Evaluate pawn structure using pre-parsed pawn lists (avoids redundant
   * parseCode calls – the caller already extracted file/rank for each pawn).
   *
   * Scores: doubled pawn = -10, isolated pawn = -10,
   *         passed pawn  = +10 … +35 depending on advancement.
   * All values are from White's perspective (positive = good for White).
   * @param {Array<{file:string, rank:string}>} wPawns
   * @param {Array<{file:string, rank:string}>} bPawns
   * @return {number}
   */
  static #evalPawnStructure(wPawns, bPawns) {
    let score = 0;

    // Build per-file pawn counts (O(p) instead of repeated includes())
    const wFileCount = {};
    const bFileCount = {};
    for (let i = 0; i < wPawns.length; i++) {
      const f = wPawns[i].file;
      wFileCount[f] = (wFileCount[f] || 0) + 1;
    }
    for (let i = 0; i < bPawns.length; i++) {
      const f = bPawns[i].file;
      bFileCount[f] = (bFileCount[f] || 0) + 1;
    }

    const files = 'abcdefgh';

    // White pawns
    for (let i = 0; i < wPawns.length; i++) {
      const { file, rank } = wPawns[i];
      const fIdx = this.#fileToIdx[file];
      const rankNum = +rank;

      // Doubled pawn
      if (wFileCount[file] > 1) {
        score -= 10;
      }

      // Isolated pawn (no friendly pawn on adjacent files)
      const hasNeighbor =
        (fIdx > 0 && wFileCount[files[fIdx - 1]]) ||
        (fIdx < 7 && wFileCount[files[fIdx + 1]]);
      if (!hasNeighbor) {
        score -= 10;
      }

      // Passed pawn: no black pawn on same or adjacent file ahead of this pawn
      let isBlocked = false;
      for (let j = 0; j < bPawns.length; j++) {
        const efIdx = this.#fileToIdx[bPawns[j].file];
        // "ahead" for white means higher rank number
        if (Math.abs(efIdx - fIdx) <= 1 && +bPawns[j].rank > rankNum) {
          isBlocked = true;
          break;
        }
      }
      if (!isBlocked) {
        score += 10 + (rankNum - 2) * 5;
      }
    }

    // Black pawns (mirror; subtract from score because negative = good for black)
    for (let i = 0; i < bPawns.length; i++) {
      const { file, rank } = bPawns[i];
      const fIdx = this.#fileToIdx[file];
      const rankNum = +rank;

      // Doubled pawn
      if (bFileCount[file] > 1) {
        score += 10;
      }

      // Isolated pawn
      const hasNeighbor =
        (fIdx > 0 && bFileCount[files[fIdx - 1]]) ||
        (fIdx < 7 && bFileCount[files[fIdx + 1]]);
      if (!hasNeighbor) {
        score += 10;
      }

      // Passed pawn: no white pawn on same or adjacent file ahead of this pawn
      // "ahead" for black means lower rank number
      let isBlocked = false;
      for (let j = 0; j < wPawns.length; j++) {
        const wfIdx = this.#fileToIdx[wPawns[j].file];
        if (Math.abs(wfIdx - fIdx) <= 1 && +wPawns[j].rank < rankNum) {
          isBlocked = true;
          break;
        }
      }
      if (!isBlocked) {
        score -= 10 + (7 - rankNum) * 5;
      }
    }

    return score;
  }

  // ── Static evaluation ──────────────────────────────────────────────────────

  /**
   * Static evaluation (positive = White winning, negative = Black winning).
   *
   * Optimised over the original:
   *  • Direct string-index access (code[0..3]) replaces parseCode() per piece.
   *  • Pre-computed #rankToIdx / #fileToIdx replace flip(indexOf)(Rank/File).
   *  • Pawn data is collected in one pass and reused for structure evaluation,
   *    avoiding a second round of parseCode calls inside #evalPawnStructure.
   * @param {object} state
   * @return {number}
   */
  static #evaluate(state) {
    // timeline[0] is the current board snapshot (array of piece-code strings).
    const snapshot = state.timeline[0];
    let totalEvaluation = 0;
    const wPawns = [];
    const bPawns = [];

    for (let i = 0, len = snapshot.length; i < len; i++) {
      const code = snapshot[i];
      // Piece codes are always 4 characters: side(1) + piece(1) + file(1) + rank(1)
      // e.g.  "wPe2"  "bKe8"
      const side = code[0]; // 'w' | 'b'
      const piece = code[1]; // P/N/B/R/Q/K
      const file = code[2]; // a–h
      const rank = code[3]; // 1–8

      const rIdx = this.#rankToIdx[rank];
      const fIdx = this.#fileToIdx[file];
      const pst = this.#PST[side + piece]; // side-specific piece-square table
      const score = this.#Scores[piece] + pst[rIdx][fIdx];

      if (side === 'w') {
        totalEvaluation += score;
        if (piece === 'P') {
          wPawns.push({ file, rank });
        }
      } else {
        totalEvaluation -= score;
        if (piece === 'P') {
          bPawns.push({ file, rank });
        }
      }
    }

    totalEvaluation += this.#evalPawnStructure(wPawns, bPawns);

    return totalEvaluation;
  }

  // ── Quiescence search ──────────────────────────────────────────────────────

  /**
   * Quiescence search: extend beyond depth=0 for captures only.
   * Prevents the horizon effect (missing a recapture one move past the depth limit).
   * @param {object}  currState
   * @param {number}  alpha
   * @param {number}  beta
   * @param {boolean} isMaximisingPlayer
   * @param {number}  [qDepth=0]
   * @return {number}
   */
  static #quiescence(currState, alpha, beta, isMaximisingPlayer, qDepth = 0) {
    const MAX_Q_DEPTH = 3;
    const standPat = this.#evaluate(currState);
    let localAlpha = alpha;
    let localBeta = beta;

    // Stand-pat pruning: if the static eval already beats the window, cut off.
    if (isMaximisingPlayer) {
      if (standPat >= localBeta) {
        return standPat;
      }
      if (standPat > localAlpha) {
        localAlpha = standPat;
      }
    } else {
      if (standPat <= localAlpha) {
        return standPat;
      }
      if (standPat < localBeta) {
        localBeta = standPat;
      }
    }

    if (qDepth >= MAX_Q_DEPTH) {
      return standPat;
    }

    // Generate captures only (uses fast pseudo-legal computeRawMT).
    const iV = StateBuilder.createInitialV(currState);
    const codeList = this.createList(iV.side, iV.snapshot);
    const captureList = [];

    for (let i = 0, len = codeList.length; i < len; i++) {
      const states = StateBuilder.of(iV).buildCaptures(codeList[i]);
      if (states.length > 0) {
        captureList.push(...states);
      }
    }

    if (captureList.length === 0) {
      return standPat;
    }

    const ordered = this.orderMoves(captureList);

    for (let i = 0, len = ordered.length; i < len; i++) {
      const score = this.#quiescence(
        ordered[i],
        localAlpha,
        localBeta,
        !isMaximisingPlayer,
        qDepth + 1
      );

      if (isMaximisingPlayer) {
        if (score >= localBeta) {
          return score;
        }
        if (score > localAlpha) {
          localAlpha = score;
        }
      } else {
        if (score <= localAlpha) {
          return score;
        }
        if (score < localBeta) {
          localBeta = score;
        }
      }
    }

    return isMaximisingPlayer ? localAlpha : localBeta;
  }

  // ── Minimax with alpha-beta + TT + killers ─────────────────────────────────

  /**
   * Minimax with alpha-beta pruning, transposition table, and killer moves.
   *
   * New vs original:
   *  1. TT probe at entry: skips re-evaluating positions we've already seen
   *     at equal-or-greater depth.
   *  2. orderMoves receives `depth` so killer moves are tried before other
   *     quiet moves.
   *  3. Beta-cutoff stores a TT lower-bound entry and records the killer move.
   *  4. Full-search stores an exact or upper-bound TT entry.
   * @param {object}  currState
   * @param {number}  depth
   * @param {number}  alpha
   * @param {number}  beta
   * @param {boolean} isMaximisingPlayer
   * @return {number} best score
   */
  static minimax(currState, depth, alpha, beta, isMaximisingPlayer) {
    if (depth === 0) {
      return this.#quiescence(currState, alpha, beta, isMaximisingPlayer);
    }

    const origAlpha = alpha;
    let localAlpha = alpha;
    let localBeta = beta;

    // ── TT probe ─────────────────────────────────────────────────────────────
    // Key: join the current snapshot + side (consistent ordering, no sort needed
    // because replaceCode / reject preserve relative element order).
    const ttKey = currState.timeline[0].join('') + currState.side;
    const ttEntry = this.#tt.get(ttKey);

    if (ttEntry !== undefined && ttEntry.depth >= depth) {
      const s = ttEntry.score;
      if (ttEntry.flag === this.#TT_EXACT) {
        return s;
      }
      if (ttEntry.flag === this.#TT_LOWERBOUND) {
        if (s >= localBeta) {
          return s;
        }
        if (s > localAlpha) {
          localAlpha = s;
        }
      } else {
        // TT_UPPERBOUND
        if (s <= localAlpha) {
          return s;
        }
        if (s < localBeta) {
          localBeta = s;
        }
      }
      if (localAlpha >= localBeta) {
        return s;
      }
    }

    // ── Move generation ───────────────────────────────────────────────────────
    const iV = StateBuilder.createInitialV(currState);
    const codeList = this.createList(iV.side, iV.snapshot);
    const stateList = [];
    let bestMove = isMaximisingPlayer ? -9999 : 9999;

    for (let i = 0, len = codeList.length; i < len; i++) {
      const state = StateBuilder.of(iV).build(codeList[i]);
      if (state.length > 0) {
        stateList.push(...state);
      }
    }

    if (stateList.length === 0) {
      // No legal moves – checkmate or stalemate; return terminal score as-is.
      return bestMove;
    }

    // Pass depth so killer moves are placed right after captures.
    const orderedList = this.orderMoves(stateList, depth);

    // ── Alpha-beta search ─────────────────────────────────────────────────────
    let cutoffState = null;

    for (let i = 0, len = orderedList.length; i < len; i++) {
      const score = this.minimax(
        orderedList[i],
        depth - 1,
        localAlpha,
        localBeta,
        !isMaximisingPlayer
      );

      if (isMaximisingPlayer) {
        if (score > bestMove) {
          bestMove = score;
        }
        if (bestMove > localAlpha) {
          localAlpha = bestMove;
        }
      } else {
        if (score < bestMove) {
          bestMove = score;
        }
        if (bestMove < localBeta) {
          localBeta = bestMove;
        }
      }

      if (localAlpha >= localBeta) {
        cutoffState = orderedList[i];
        break;
      }
    }

    // ── Killer move storage ───────────────────────────────────────────────────
    if (cutoffState !== null) {
      this.#storeKiller(cutoffState, depth);
    }

    // ── TT store ─────────────────────────────────────────────────────────────
    // Determine flag: fail-high → lower-bound, fail-low → upper-bound, else exact.
    let flag;
    if (bestMove >= beta) {
      flag = this.#TT_LOWERBOUND;
    } else if (bestMove <= origAlpha) {
      flag = this.#TT_UPPERBOUND;
    } else {
      flag = this.#TT_EXACT;
    }

    if (this.#tt.size < this.#TT_MAX_SIZE) {
      this.#tt.set(ttKey, { score: bestMove, depth, flag });
    }

    return bestMove;
  }

  /**
   * Create list of pieces for the given side.
   * @param {string} side     - 'w' | 'b'
   * @param {Array}  snapshot
   * @return {Array}
   */
  static createList(side, snapshot) {
    return filter(startsWith(side), snapshot);
  }
}

export { AI };
