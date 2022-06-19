import {
  indexOf,
  head,
  filter,
  forEach,
  startsWith,
  reverse,
  isEmpty,
} from 'ramda';
import StateBuilder from './StateBuilder';
import { parseCode } from '../utils';
import { PST, Side, File, Rank } from '../presets';

// TODO
// bestway for boosting performance
// 1. go rust
// 2. implement core functions to another ways

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

  /**
   * Evaluate state
   * @param  {Object} state
   * @return {Number}
   */
  static #evaluate(state) {
    const { timeline } = state;
    const snapshot = head(timeline);
    let totalEvalW = 0;
    let totalEvalB = 0;

    forEach((code) => {
      const { side, piece, pKey, fileName, rankName } = parseCode(code);
      const rIdx = indexOf(Number(rankName), reverse(Rank));
      const fIdx = indexOf(fileName, File);
      const pstProp = this.#PST[pKey] || this.#PST[piece];
      const pstScore = pstProp[rIdx][fIdx];
      const score = this.#Scores[piece] + pstScore;

      if (side === Side.w) {
        totalEvalW += score;
      } else {
        totalEvalB -= score;
      }
    }, snapshot);

    return totalEvalW + totalEvalB;
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
    if (depth === 0) {
      return -this.#evaluate(currState);
    }

    const iV = StateBuilder.createInitialV(currState);
    const codeList = this.createList(iV.side, iV.snapshot);
    const stateList = [];

    for (let i = 0, len = codeList.length; i < len; i++) {
      // TODO StateBuilder spent time that calculating movable tiles
      const generatedStates = StateBuilder.of(iV).build(codeList[i]);

      if (!isEmpty(generatedStates)) {
        stateList.push(...generatedStates);
      }
    }

    const _minimax = (state) => {
      return this.minimax(state, depth - 1, alpha, beta, !isMaximisingPlayer);
    };

    if (isMaximisingPlayer) {
      let bestMove = -9999;

      for (let i = 0, len = stateList.length; i < len; i++) {
        bestMove = Math.max(bestMove, _minimax(stateList[i]));
        alpha = Math.max(alpha, bestMove);

        if (alpha >= beta) {
          return bestMove;
        }
      }

      return bestMove;
    } else {
      let bestMove = 9999;

      for (let i = 0, len = stateList.length; i < len; i++) {
        bestMove = Math.min(bestMove, _minimax(stateList[i]));
        beta = Math.min(beta, bestMove);

        if (alpha >= beta) {
          return bestMove;
        }
      }

      return bestMove;
    }
  }

  static createList(side, snapshot) {
    return filter(startsWith(side), snapshot);
  }
}

export default AI;
