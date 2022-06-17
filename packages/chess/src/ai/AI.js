import { head, filter, startsWith, isEmpty } from 'ramda';
import StateBuilder from './StateBuilder';
import evaluateState from './evaluation';
import { Opponent } from '../presets';

class AI {
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

    const { timeline, side } = currState;
    const snapshot = head(timeline);
    const codeList = filter(startsWith(side), snapshot);

    // if (isEmpty(snapshot)) {
    //   console.log('what???', codeList, side, snapshot, timeline);
    // }

    let bestState = {
      ...currState,
      score: isMaximizing ? -Infinity : Infinity,
    };

    // console.log(depth, isMaximizing);

    for (let i = 0, len = codeList.length; i < len; i++) {
      const generatedStates = StateBuilder.prepare({
        enemySide: Opponent[side],
        currCode: codeList[i],
        checkData: {},
        snapshot,
        ...currState,
      }).build();

      if (isEmpty(generatedStates)) {
        // console.log('...');
        return bestState;
      }

      for (let j = 0, len = generatedStates.length; j < len; j++) {
        const nextState = this.minimax(
          generatedStates[j],
          depth - 1,
          alpha,
          beta,
          !isMaximizing
        );

        if (isMaximizing) {
          if (nextState.score > bestState.score) {
            bestState = {
              ...nextState,
              score: nextState.score,
            };
          }

          alpha = Math.max(alpha, bestState.score);
        } else {
          if (nextState.score < bestState.score) {
            bestState = {
              ...nextState,
              score: nextState.score,
            };
          }

          beta = Math.min(beta, bestState.score);
        }
      }

      if (alpha >= beta) {
        return bestState;
      }
    }

    return bestState;
  }
}

export default AI;
