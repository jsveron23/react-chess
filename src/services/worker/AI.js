import { compose, forEach, filter, startsWith, head } from 'ramda';
import { Opponent } from 'chess/es';
import EvaluateState from './EvaluateState';
import StateBuilder from './StateBuilder';

class AI extends EvaluateState {
  constructor(iV) {
    super();

    this.timeline = iV.timeline;
    this.snapshot = head(this.timeline);
    this.checkData = iV.checkData || {};
    this.node = iV.node || [];
    this.char = iV.char;
  }

  /**
   * AI runs with `generated state<StateBuilder>` in each depth
   * @param {Function} cb
   */
  run(cb) {
    compose(
      forEach((currCode) => {
        forEach(
          cb,
          StateBuilder.prepare({
            enemySide: Opponent[this.char], // current depth's state enemy
            timeline: this.timeline,
            snapshot: this.snapshot,
            node: this.node,
            currCode,
            ...this.checkData,
          }).build()
        );
      }),
      filter(startsWith(this.char))
    )(this.snapshot);
  }

  /**
   * Create instance
   * @param  {Object} initialValues
   * @return {AI}     instance
   */
  static prepare(initialValues) {
    return new AI(initialValues);
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
      return super.evaluateState(currState);
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
}

export default AI;
