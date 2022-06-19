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

// TODO
// best way for boosting performance
// 1. go rust
// 2. implement core functions to another ways

const _indexOfRank = flip(indexOf)(reverse(Rank));
const _indexOfFile = flip(indexOf)(File);

class AI {
  static #PST = {
    wP: PST.P,
    bP: reverse(PST.P),
    N: PST.N,
    wB: PST.B,
    bB: reverse(PST.B),
    wR: PST.R,
    bR: reverse(PST.R),
    Q: PST.Q,
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

  static #evalCaptureScore(state) {
    const { side, pretendCode } = state;
    const piece = parseCode.prop('piece', pretendCode);
    const cScore = this.#Scores[piece];

    if (side === Side.w) {
      return cScore;
    } else {
      return -cScore;
    }
  }

  /**
   * Evaluate state
   * @param  {Object} state
   * @return {Number}
   */
  static #evaluate(state) {
    const { timeline, isCaptured } = state;
    const snapshot = head(timeline);
    let totalEvaluation = 0;

    if (isCaptured) {
      totalEvaluation += this.#evalCaptureScore(state);
    }

    forEach((code) => {
      const { side, piece, pKey, fileName, rankName } = parseCode(code);
      const rIdx = _indexOfRank(Number(rankName));
      const fIdx = _indexOfFile(fileName);
      const pstProp = this.#PST[pKey] || this.#PST[piece];
      const pstScore = pstProp[rIdx][fIdx];
      const score = this.#Scores[piece] + pstScore;

      totalEvaluation += side === Side.w ? score : -score;
    }, snapshot);

    return totalEvaluation;
  }

  /**
   * Minimax Algorithm
   * TODO reduce running time
   * @param  {Object}  currState
   * @param  {Number}  depth
   * @param  {Number}  alpha
   * @param  {Number}  beta
   * @param  {Boolean} isMaximisingPlayer
   * @return {Number}
   */
  static minimax(currState, depth, alpha, beta, isMaximisingPlayer) {
    if (depth === 0 || currState.isCaptured) {
      return -this.#evaluate(currState);
    }

    const iV = StateBuilder.createInitialV(currState);
    const codeList = this.createList(iV.side, iV.snapshot);
    const stateList = [];
    let bestMove = isMaximisingPlayer ? -9999 : 9999;

    for (let i = 0, len = codeList.length; i < len; i++) {
      // TODO StateBuilder spent time that calculating movable tiles
      const state = StateBuilder.of(iV).build(codeList[i]);

      if (!isEmpty(state)) {
        stateList.push(...state);
      }
    }

    for (let i = 0, len = stateList.length; i < len; i++) {
      const score = this.minimax(
        stateList[i],
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
