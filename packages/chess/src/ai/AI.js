import {
  indexOf,
  head,
  filter,
  forEach,
  startsWith,
  reverse,
  isEmpty,
  flip,
} from 'ramda';
import StateBuilder from './StateBuilder';
import { parseCode } from '../utils';
import { PST, Side, File, Rank } from '../presets';

const _indexOfRank = flip(indexOf)(Rank);
const _indexOfFile = flip(indexOf)(File);

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

  /**
   * MVV-LVA (Most Valuable Victim - Least Valuable Attacker)
   * Higher score = capture this first (e.g. pawn takes queen = +800)
   */
  static #mvvLva(state) {
    const { piece: victimPiece } = parseCode(state.pretendCode);
    const attackerCode = state.node[state.node.length - 2];
    const { piece: attackerPiece } = parseCode(attackerCode);
    return this.#Scores[victimPiece] - this.#Scores[attackerPiece];
  }

  /**
   * Sort moves: captures first ordered by MVV-LVA, then quiet moves
   */
  static orderMoves(stateList) {
    return [...stateList].sort((a, b) => {
      const aScore = a.isCaptured ? 1000 + this.#mvvLva(a) : 0;
      const bScore = b.isCaptured ? 1000 + this.#mvvLva(b) : 0;
      return bScore - aScore;
    });
  }

  /**
   * Pawn structure evaluation: doubled, isolated, passed pawn
   */
  static #evalPawnStructure(snapshot) {
    let score = 0;
    const wPawns = snapshot.filter((c) => c.startsWith('wP'));
    const bPawns = snapshot.filter((c) => c.startsWith('bP'));

    for (const side of ['w', 'b']) {
      const pawns = side === 'w' ? wPawns : bPawns;
      const enemyPawns = side === 'w' ? bPawns : wPawns;
      const mult = side === 'w' ? 1 : -1;
      const isWhite = side === 'w';

      const pawnFiles = pawns.map((c) => parseCode(c).fileName);
      const fileCount = {};
      for (const f of pawnFiles) {
        fileCount[f] = (fileCount[f] || 0) + 1;
      }

      for (const code of pawns) {
        const { fileName, rankName } = parseCode(code);
        const fileIdx = File.indexOf(fileName);
        const rank = Number(rankName);

        // Doubled pawn: two friendly pawns on the same file
        if (fileCount[fileName] > 1) {
          score += mult * -10;
        }

        // Isolated pawn: no friendly pawn on adjacent files
        const hasNeighbor =
          (fileIdx > 0 && pawnFiles.includes(File[fileIdx - 1])) ||
          (fileIdx < 7 && pawnFiles.includes(File[fileIdx + 1]));
        if (!hasNeighbor) {
          score += mult * -10;
        }

        // Passed pawn: no enemy pawn on same OR adjacent files ahead
        const isBlocked = enemyPawns.some((ep) => {
          const { fileName: ef, rankName: er } = parseCode(ep);
          const erNum = Number(er);
          const efIdx = File.indexOf(ef);
          const isAdjacent =
            efIdx === fileIdx - 1 || efIdx === fileIdx || efIdx === fileIdx + 1;
          return isAdjacent && (isWhite ? erNum > rank : erNum < rank);
        });
        if (!isBlocked) {
          const advance = isWhite ? rank - 2 : 7 - rank;
          score += mult * (10 + advance * 5);
        }
      }
    }

    return score;
  }

  /**
   * Static evaluation (positive = white winning, negative = black winning)
   */
  static #evaluate(state) {
    const { timeline } = state;
    const snapshot = head(timeline);
    let totalEvaluation = 0;

    forEach((code) => {
      const { side, piece, pKey, fileName, rankName } = parseCode(code);
      const rIdx = _indexOfRank(Number(rankName));
      const fIdx = _indexOfFile(fileName);
      const pstProp = this.#PST[pKey] || this.#PST[piece];
      const pstScore = pstProp[rIdx][fIdx];
      const score = this.#Scores[piece] + pstScore;

      totalEvaluation += side === Side.w ? score : -score;
    }, snapshot);

    totalEvaluation += this.#evalPawnStructure(snapshot);

    return totalEvaluation;
  }

  /**
   * Quiescence search: extend beyond depth=0 for captures only
   * Prevents horizon effect (e.g. AI doesn't see recapture one move past depth limit)
   */
  static #quiescence(currState, alpha, beta, isMaximisingPlayer, qDepth = 0) {
    const MAX_Q_DEPTH = 3;
    const standPat = this.#evaluate(currState);

    // Stand-pat pruning: if current position already beats the window, cut off
    if (isMaximisingPlayer) {
      if (standPat >= beta) return standPat;
      if (standPat > alpha) alpha = standPat;
    } else {
      if (standPat <= alpha) return standPat;
      if (standPat < beta) beta = standPat;
    }

    if (qDepth >= MAX_Q_DEPTH) return standPat;

    // Generate capture moves only — uses pseudo-legal computeRawMT (no pin detection)
    // for speed; full legal move generation would be too expensive here
    const iV = StateBuilder.createInitialV(currState);
    const codeList = this.createList(iV.side, iV.snapshot);
    const captureList = [];

    for (let i = 0, len = codeList.length; i < len; i++) {
      const states = StateBuilder.of(iV).buildCaptures(codeList[i]);
      if (!isEmpty(states)) {
        captureList.push(...states);
      }
    }

    if (captureList.length === 0) return standPat;

    const ordered = this.orderMoves(captureList);

    for (let i = 0, len = ordered.length; i < len; i++) {
      const score = this.#quiescence(
        ordered[i],
        alpha,
        beta,
        !isMaximisingPlayer,
        qDepth + 1
      );

      if (isMaximisingPlayer) {
        if (score >= beta) return score;
        if (score > alpha) alpha = score;
      } else {
        if (score <= alpha) return score;
        if (score < beta) beta = score;
      }
    }

    return isMaximisingPlayer ? alpha : beta;
  }

  /**
   * Minimax with alpha-beta pruning + move ordering
   */
  static minimax(currState, depth, alpha, beta, isMaximisingPlayer) {
    if (depth === 0) {
      return this.#quiescence(currState, alpha, beta, isMaximisingPlayer);
    }

    const iV = StateBuilder.createInitialV(currState);
    const codeList = this.createList(iV.side, iV.snapshot);
    const stateList = [];
    let bestMove = isMaximisingPlayer ? -9999 : 9999;

    for (let i = 0, len = codeList.length; i < len; i++) {
      const state = StateBuilder.of(iV).build(codeList[i]);

      if (!isEmpty(state)) {
        stateList.push(...state);
      }
    }

    const orderedList = this.orderMoves(stateList);

    for (let i = 0, len = orderedList.length; i < len; i++) {
      const score = this.minimax(
        orderedList[i],
        depth - 1,
        alpha,
        beta,
        !isMaximisingPlayer
      );

      if (isMaximisingPlayer) {
        bestMove = Math.max(bestMove, score);
        alpha = Math.max(alpha, bestMove);
      } else {
        bestMove = Math.min(bestMove, score);
        beta = Math.min(beta, bestMove);
      }

      if (alpha >= beta) {
        break;
      }
    }

    return bestMove;
  }

  static createList(side, snapshot) {
    return filter(startsWith(side), snapshot);
  }
}

export default AI;
