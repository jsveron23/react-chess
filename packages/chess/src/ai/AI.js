import { head, isEmpty, filter, startsWith } from 'ramda';
import StateBuilder from './StateBuilder';
import evaluateState from './evaluation';
import { Opponent } from '../presets';

class AI {
  constructor(iV) {
    this.timeline = iV.timeline;
    this.snapshot = head(this.timeline);
    this.checkData = iV.checkData || {};
    this.node = iV.node || [];
    this.side = iV.side;
    this.codeList = filter(startsWith(this.side), this.snapshot);

    this.baseConfig = {
      enemySide: Opponent[this.side], // current depth's state enemy
      timeline: this.timeline,
      snapshot: this.snapshot,
      node: this.node,
      ...this.checkData,
    };
  }

  /**
   * AI runs with `generated state<StateBuilder>` in each depth
   * @param {Function} cb
   */
  iter(cb) {
    for (let i = 0, len = this.codeList.length; i < len; i++) {
      const generatedStates = StateBuilder.prepare({
        ...this.baseConfig,
        currCode: this.codeList[i],
      }).build();

      if (!isEmpty(generatedStates)) {
        for (let j = 0, len = generatedStates.length; j < len; j++) {
          const state = cb(generatedStates[j]);

          if (state) {
            return;
          }
        }
      }
    }
  }

  /**
   * Create instance
   * @param  {Object} iV
   * @return {AI}     instance
   */
  static of(iV) {
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
      return evaluateState(currState);
    }

    let bestState = {
      ...currState,
      score: isMaximizing ? -Infinity : Infinity,
    };

    // prettier-ignore
    AI
      .of({ ...currState, side: Opponent[currState.side] })
      .iter((generatedState) => {
        if (isMaximizing) {
          const nextState = this.minimax(
            generatedState,
            depth - 1,
            alpha,
            beta,
            false
          );

          if (nextState.score > bestState.score) {
            bestState = {
              ...nextState,
              score: nextState.score
            };
          }

          alpha = Math.max(alpha, bestState.score);
        } else {
          const nextState = this.minimax(
            generatedState,
            depth - 1,
            alpha,
            beta,
            true
          );

          if (nextState.score < bestState.score) {
            bestState = {
              ...nextState,
              score: nextState.score
            };
          }

          beta = Math.min(beta, bestState.score);
        }

        // TODO gocha!! not work properly
        if (alpha >= beta) {
          return bestState;
        }

        return bestState;
      });

    return bestState;
  }
}

export default AI;
