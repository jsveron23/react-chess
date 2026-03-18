import { filter, startsWith, reverse } from 'ramda';
import { StateBuilder } from './state-builder';
import { PST, File, Rank, Opponent } from '../presets';

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

  // ── History Heuristic ──────────────────────────────────────────────────────
  // Tracks how often a quiet move caused a beta-cutoff across all depths.
  // Used to boost ordering of quiet moves that historically cut well.
  // Key: moveId (e.g. "e2e4"), Value: accumulated score
  static #history = {};

  /**
   * Reset all search-specific state.
   * Call once at the beginning of each CPU turn (before kicking off minimax).
   */
  static clearSearchState() {
    this.#tt.clear();
    this.#killers = [];
    this.#history = {};
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
    // History heuristic: accumulate score for moves that cause cutoffs
    this.#history[moveId] = (this.#history[moveId] || 0) + depth * depth;
  }

  // ── MVV-LVA ────────────────────────────────────────────────────────────────

  /**
   * Most Valuable Victim – Least Valuable Attacker score.
   * Higher = capture this first (e.g. pawn takes queen = +800).
   * @param {object} state
   * @return {number}
   */
  static #mvvLva(state) {
    const victimPiece = state.pretendCode[1];
    const attackerPiece = state.node[state.node.length - 2][1];

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
    const history = this.#history;

    return [...stateList].sort((a, b) => {
      const aScore = a.isCaptured
        ? 2000 + this.#mvvLva(a)
        : this.#killerScore(a, depth) + (history[this.#getMoveId(a)] || 0);
      const bScore = b.isCaptured
        ? 2000 + this.#mvvLva(b)
        : this.#killerScore(b, depth) + (history[this.#getMoveId(b)] || 0);

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

  // ── King safety evaluation ─────────────────────────────────────────────────

  /**
   * Evaluate king safety based on enemy piece proximity and pawn shield.
   *
   * Danger score: count enemy major/minor pieces within a 2-square radius of
   * the king, weighted by piece type (Q=4, R=3, B/N=2). Quadratic scaling
   * means multiple attackers near the king are penalised much more heavily
   * than a single attacker — reflecting real attacking chances.
   *
   * Pawn shield: friendly pawns directly in front of the king (same/adjacent
   * file, 1–2 ranks ahead) are rewarded; a bare king with no shield is penalised.
   *
   * All values are from White's perspective (positive = good for White).
   * @param {Array}  snapshot
   * @param {Array<{file:string, rank:string}>} wPawns
   * @param {Array<{file:string, rank:string}>} bPawns
   * @return {number}
   */
  static #evalKingSafety(snapshot, wPawns, bPawns) {
    let score = 0;
    let wKFile = -1,
      wKRank = -1;
    let bKFile = -1,
      bKRank = -1;

    // Locate both kings in one pass.
    for (let i = 0, len = snapshot.length; i < len; i++) {
      const code = snapshot[i];
      if (code[1] === 'K') {
        if (code[0] === 'w') {
          wKFile = this.#fileToIdx[code[2]];
          wKRank = +code[3];
        } else {
          bKFile = this.#fileToIdx[code[2]];
          bKRank = +code[3];
        }
      }
    }

    // Count enemy pieces within a 2-square king-zone radius.
    let wDanger = 0; // threat to white king (black attackers)
    let bDanger = 0; // threat to black king (white attackers)

    for (let i = 0, len = snapshot.length; i < len; i++) {
      const code = snapshot[i];
      const side = code[0];
      const piece = code[1];
      if (piece === 'K' || piece === 'P') continue;

      const fIdx = this.#fileToIdx[code[2]];
      const rNum = +code[3];
      const w = piece === 'Q' ? 4 : piece === 'R' ? 3 : 2;

      if (side === 'b' && wKFile >= 0) {
        if (Math.abs(fIdx - wKFile) <= 2 && Math.abs(rNum - wKRank) <= 2) {
          wDanger += w;
        }
      } else if (side === 'w' && bKFile >= 0) {
        if (Math.abs(fIdx - bKFile) <= 2 && Math.abs(rNum - bKRank) <= 2) {
          bDanger += w;
        }
      }
    }

    // Quadratic penalty: 2 attackers is much worse than 1, 3 is critical.
    score -= wDanger * wDanger * 4;
    score += bDanger * bDanger * 4;

    // Pawn shield: friendly pawns 1-2 ranks in front of the king on same/adj file.
    // Only meaningful when the king is on its own back ranks (ranks 1-3 / 6-8).
    if (wKFile >= 0 && wKRank <= 3) {
      let shield = 0;
      for (let i = 0; i < wPawns.length; i++) {
        const fd = Math.abs(this.#fileToIdx[wPawns[i].file] - wKFile);
        const rn = +wPawns[i].rank;
        if (fd <= 1 && rn > wKRank && rn <= wKRank + 2) shield++;
      }
      score += shield * 10;
      if (shield === 0) score -= 25; // bare king penalty
    }

    if (bKFile >= 0 && bKRank >= 6) {
      let shield = 0;
      for (let i = 0; i < bPawns.length; i++) {
        const fd = Math.abs(this.#fileToIdx[bPawns[i].file] - bKFile);
        const rn = +bPawns[i].rank;
        if (fd <= 1 && rn < bKRank && rn >= bKRank - 2) shield++;
      }
      score -= shield * 10;
      if (shield === 0) score += 25; // bare king penalty
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
    totalEvaluation += this.#evalKingSafety(snapshot, wPawns, bPawns);

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
    const DELTA_MARGIN = 200;

    for (let i = 0, len = ordered.length; i < len; i++) {
      const capture = ordered[i];

      // Delta pruning: skip captures whose best-case gain still can't reach alpha/beta.
      const victimValue = this.#Scores[capture.pretendCode[1]];
      if (
        isMaximisingPlayer &&
        standPat + victimValue + DELTA_MARGIN <= localAlpha
      ) {
        continue;
      }
      if (
        !isMaximisingPlayer &&
        standPat - victimValue - DELTA_MARGIN >= localBeta
      ) {
        continue;
      }

      const score = this.#quiescence(
        capture,
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
    // Check extension: search one ply deeper when the king is in check so the
    // AI never stops mid-check-sequence and misses forced defensive resources.
    const effectiveDepth =
      currState.attackerCode && depth > 0 ? depth + 1 : depth;

    if (effectiveDepth === 0) {
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

    if (ttEntry !== undefined && ttEntry.depth >= effectiveDepth) {
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

    // ── Null Move Pruning ─────────────────────────────────────────────────────
    // Skip a turn (null move) and search at reduced depth. If the result still
    // exceeds beta, the position is so good that we can prune without searching.
    // Skipped when: depth < 3, king is in check (attackerCode set at root only,
    // but we guard anyway), or side has only king + pawns (zugzwang risk).
    if (effectiveDepth >= 3 && !currState.attackerCode) {
      // Zugzwang guard: skip NMP if the side to move has only king + pawns
      const snapshot = currState.timeline[0];
      const side = currState.side;
      let hasMinorOrMajor = false;
      for (let i = 0, len = snapshot.length; i < len; i++) {
        if (snapshot[i][0] === side) {
          const piece = snapshot[i][1];
          if (piece !== 'P' && piece !== 'K') {
            hasMinorOrMajor = true;
            break;
          }
        }
      }
      if (hasMinorOrMajor) {
        const nullState = {
          timeline: currState.timeline,
          node: currState.node,
          side: Opponent[side],
          pretendCode: '',
          isCaptured: false,
        };
        if (isMaximisingPlayer) {
          // Maximizing: if passing the turn still beats beta, prune.
          const nullScore = this.minimax(
            nullState,
            effectiveDepth - 3,
            localBeta - 1,
            localBeta,
            false
          );
          if (nullScore >= localBeta) {
            return localBeta;
          }
        } else {
          // Minimizing: if passing the turn still falls below alpha, prune.
          const nullScore = this.minimax(
            nullState,
            effectiveDepth - 3,
            localAlpha,
            localAlpha + 1,
            true
          );
          if (nullScore <= localAlpha) {
            return localAlpha;
          }
        }
      }
    }

    // ── Razoring ──────────────────────────────────────────────────────────────
    // At shallow depth, if the static eval is far below the search window the
    // position is almost certainly hopeless — drop straight into quiescence
    // rather than doing a full minimax expansion.
    if (effectiveDepth <= 2 && !currState.attackerCode) {
      const RAZOR_MARGIN = effectiveDepth === 1 ? 300 : 600;
      const staticEval = this.#evaluate(currState);
      if (isMaximisingPlayer && staticEval + RAZOR_MARGIN <= localAlpha) {
        return this.#quiescence(currState, localAlpha, localBeta, true);
      }
      if (!isMaximisingPlayer && staticEval - RAZOR_MARGIN >= localBeta) {
        return this.#quiescence(currState, localAlpha, localBeta, false);
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
    const orderedList = this.orderMoves(stateList, effectiveDepth);

    // ── Alpha-beta search ─────────────────────────────────────────────────────
    let cutoffState = null;
    const FUTILITY_MARGIN = 150;

    for (let i = 0, len = orderedList.length; i < len; i++) {
      const child = orderedList[i];

      // Futility pruning at depth ≤ 2: quiet moves whose static eval + margin
      // can't reach alpha/beta are unlikely to be best — skip them.
      // depth=1 margin=150, depth=2 margin=300 (larger window needed further out).
      if (effectiveDepth <= 2 && !child.isCaptured && !currState.attackerCode) {
        const futilityMargin = effectiveDepth === 1 ? FUTILITY_MARGIN : 300;
        const futilityEval = this.#evaluate(child);
        if (isMaximisingPlayer && futilityEval + futilityMargin <= localAlpha) {
          continue;
        }
        if (!isMaximisingPlayer && futilityEval - futilityMargin >= localBeta) {
          continue;
        }
      }

      let score;

      if (i === 0) {
        // PVS: first move gets the full window to establish the principal variation.
        score = this.minimax(
          child,
          effectiveDepth - 1,
          localAlpha,
          localBeta,
          !isMaximisingPlayer
        );
      } else {
        // PVS null window for all subsequent moves.
        // Also applies LMR for late quiet moves: reduced depth on the first probe.
        const pvAlpha = isMaximisingPlayer ? localAlpha : localBeta - 1;
        const pvBeta = isMaximisingPlayer ? localAlpha + 1 : localBeta;
        const isLateQuiet = i >= 4 && !child.isCaptured && effectiveDepth >= 3;
        const searchDepth = isLateQuiet
          ? effectiveDepth - 2
          : effectiveDepth - 1;

        score = this.minimax(
          child,
          searchDepth,
          pvAlpha,
          pvBeta,
          !isMaximisingPlayer
        );

        // If the null-window (or reduced-depth) search improved alpha, the move
        // is potentially better than expected — re-search at full depth + full window.
        const failsHigh = isMaximisingPlayer
          ? score > localAlpha
          : score < localBeta;
        if (failsHigh) {
          score = this.minimax(
            child,
            effectiveDepth - 1,
            localAlpha,
            localBeta,
            !isMaximisingPlayer
          );
        }
      }

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
        cutoffState = child;
        break;
      }
    }

    // ── Killer move storage ───────────────────────────────────────────────────
    if (cutoffState !== null) {
      this.#storeKiller(cutoffState, effectiveDepth);
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
      this.#tt.set(ttKey, { score: bestMove, depth: effectiveDepth, flag });
    }

    return bestMove;
  }

  /**
   * Compute evaluation breakdown by component (material, position, pawn structure, king safety).
   * All values from White's perspective: positive = good for White.
   * @param {object} state - State with timeline
   * @return {{ material: number, position: number, pawnStructure: number, kingSafety: number, total: number }}
   */
  static evaluateBreakdown(state) {
    const snapshot = state.timeline[0];
    let material = 0;
    let position = 0;
    const wPawns = [];
    const bPawns = [];

    for (let i = 0, len = snapshot.length; i < len; i++) {
      const code = snapshot[i];
      const side = code[0];
      const piece = code[1];
      const file = code[2];
      const rank = code[3];
      const rIdx = this.#rankToIdx[rank];
      const fIdx = this.#fileToIdx[file];
      const matScore = this.#Scores[piece];
      const pstScore = this.#PST[side + piece][rIdx][fIdx];

      if (side === 'w') {
        material += matScore;
        position += pstScore;
        if (piece === 'P') wPawns.push({ file, rank });
      } else {
        material -= matScore;
        position -= pstScore;
        if (piece === 'P') bPawns.push({ file, rank });
      }
    }

    const pawnStructure = this.#evalPawnStructure(wPawns, bPawns);
    const kingSafety = this.#evalKingSafety(snapshot, wPawns, bPawns);

    return {
      material,
      position,
      pawnStructure,
      kingSafety,
      total: material + position + pawnStructure + kingSafety,
    };
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
