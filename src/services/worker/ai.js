import { compose, forEach, filter, startsWith, head } from 'ramda';
import { Side, Opponent } from 'chess/es';
import computeState from './computeState';

// TODO optimize it

const ai = (function () {
  function iterate(
    {
      timeline,
      char,
      node = [
        /* initial node */
      ],
    },
    fn
  ) {
    compose(
      forEach(compose(forEach(fn), computeState(timeline, node))),
      filter(startsWith(char)),
      head
    )(timeline);
  }

  function minimax(state, depth, alpha, beta, isMaximizing) {
    if (depth === 0 || state.score > 0) {
      return state;
    }

    let bestState = {
      score: isMaximizing ? -Infinity : Infinity,
    };

    iterate({ ...state, char: Opponent[state.side] }, (nextState) => {
      const finalState = minimax(
        nextState,
        depth - 1,
        alpha,
        beta,
        !isMaximizing
      );
      const cond = isMaximizing
        ? finalState.score > bestState.score
        : finalState.score < bestState.score;

      if (cond) {
        bestState = finalState;
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

  return { iterate, minimax };
})();

self.onmessage = ({ data }) => {
  const { timeline, turn, depth = 2 } = data;
  let bestState = {
    score: -Infinity,
  };

  console.time('worker');
  ai.iterate({ timeline, char: Side[turn] }, (nextState) => {
    const finalState = ai.minimax(
      nextState,
      depth - 1,
      -Infinity,
      Infinity,
      false
    );

    if (finalState.score > bestState.score) {
      bestState = finalState;
    }
  });
  console.timeEnd('worker');

  self.postMessage({
    bestState,
  });
};
