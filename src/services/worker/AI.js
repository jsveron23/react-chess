import { compose, forEach, filter, startsWith, head } from 'ramda';
import { Opponent } from 'chess/es';
import generateState from './generateState';

class AI {
  constructor(initialValues) {
    this.timeline = initialValues.timeline;
    this.char = initialValues.char;
    this.node = initialValues.node || [];
  }

  run(fn) {
    compose(
      forEach(compose(forEach(fn), generateState(this.timeline, this.node))),
      filter(startsWith(this.char)),
      head
    )(this.timeline);
  }

  static set(initialValues) {
    return new AI(initialValues);
  }

  static minimax(state, depth, alpha, beta, isMaximizing) {
    const isWinning =
      state.isCaptured ||
      state.isCheck ||
      state.isCheckmate ||
      state.isStalemate;

    if (depth === 0 || isWinning) {
      // TODO evaluateState
      return {
        ...state,
        score: Math.random() * 100,
      };
    }

    let bestState = {
      score: isMaximizing ? -Infinity : Infinity,
    };

    // prettier-ignore
    AI
      .set({ ...state, char: Opponent[state.side] })
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
          bestState = nextState;
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
