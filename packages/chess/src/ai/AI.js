import { forEach, filter, startsWith, head } from 'ramda';
import StateBuilder from './StateBuilder';
import { getAttackers } from '../core';
import { parseCode } from '../utils';
import { Opponent } from '../presets';

const _toPKey = parseCode.prop('pKey');

class AI {
  static #Scores = {
    wP: 10,
    wN: 30,
    wB: 30,
    wR: 50,
    wQ: 90,
    wK: 900,
    bP: -10,
    bN: -30,
    bB: -30,
    bR: -50,
    bQ: -90,
    bK: -900,
  };

  constructor(iV) {
    this.timeline = iV.timeline;
    this.snapshot = head(this.timeline);
    this.checkData = iV.checkData || {};
    this.node = iV.node || [];
    this.char = iV.char;
    this.filteredCodeList = filter(startsWith(this.char), this.snapshot);
  }

  /**
   * AI runs with `generated state<StateBuilder>` in each depth
   * @param {Function} cb
   */
  run(cb) {
    const iV = {
      enemySide: Opponent[this.char], // current depth's state enemy
      timeline: this.timeline,
      snapshot: this.snapshot,
      node: this.node,
      ...this.checkData,
    };

    forEach((currCode) => {
      const generatedStates = StateBuilder.prepare({
        ...iV,
        currCode,
      }).build();

      forEach(cb, generatedStates);
    }, this.filteredCodeList);
  }

  /**
   * Create instance
   * @param  {Object} iV
   * @return {AI}     instance
   */
  static prepare(iV) {
    return new AI(iV);
  }

  /**
   * Minimax Algorithm
   * @param  {Object}  currState
   * @param  {Number}  depth
   * @param  {Number}  alpha
   * @param  {Number}  beta
   * @param  {Boolean} isMaximizing
   * @return {Object}
   */
  static minimax(currState, depth, alpha, beta, isMaximizing) {
    // TODO check it
    const inSituation =
      currState.isCaptured ||
      currState.isCheck ||
      currState.isCheckmate ||
      currState.isStalemate;

    if (depth === 0 || inSituation) {
      return this.#evaluateState(currState);
    }

    let bestState = {
      ...currState,
      score: isMaximizing ? -Infinity : Infinity,
    };

    // prettier-ignore
    AI
      .prepare({ ...currState, char: Opponent[currState.side] })
      .run((generatedState) => {
        const nextState = this.minimax(
          generatedState,
          depth - 1,
          alpha,
          beta,
          !isMaximizing
        );
        const cond = isMaximizing
          ? nextState.score > bestState.score
          : nextState.score < bestState.score;

        if (cond) {
          bestState = {
            ...nextState,
            score: nextState.score
          };
        }

        if (isMaximizing) {
          alpha = Math.max(alpha, bestState.score);

          if (bestState.score >= beta) {
            return bestState;
          }
        } else {
          beta = Math.min(beta, bestState.score);

          if (bestState.score <= alpha) {
            return bestState;
          }
        }
      });

    return bestState;
  }

  /**
   * Evaluate state
   * @param  {Object} state
   * @return {Object} state + evaluated state
   */
  static #evaluateState(state) {
    const { node = [], pretendCode, isCaptured, timeline } = state;
    const [selectedCode, nextCode] = node;
    // let penalty = 0;
    let score = -1;

    // TODO not captured not why score 0
    if (isCaptured) {
      const selectedPKey = _toPKey(selectedCode);
      const pretendPKey = _toPKey(pretendCode);

      // TODO not perfect
      // TODO should be calculated before moving (timeline)
      const [attackerCode] = getAttackers(nextCode, timeline);

      // TODO better
      score = attackerCode
        ? 0
        : this.#Scores[pretendPKey] - this.#Scores[selectedPKey];
    }

    // TODO more

    return {
      ...state,
      score: score > -1 ? score : Math.floor(Math.random() * 5),
    };
  }
}

export default AI;
