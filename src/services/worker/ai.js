import { compose, forEach, filter, startsWith } from 'ramda';
import { Side, Opponent } from 'chess/es';
import predictScore from './predictScore';

// TODO optimize it

self.onmessage = ({ data }) => {
  const { timeline, turn, difficulty = 2 } = data;
  const [snapshot] = timeline;
  let bestState = {
    score: -Infinity,
  };

  compose(
    forEach(
      compose(
        forEach((nextState) => {
          const finalState = minimax(nextState, difficulty, false);

          if (finalState.score > bestState.score) {
            bestState = finalState;
          }
        }),
        predictScore(timeline, [])
      )
    ),
    filter(startsWith(Side[turn]))
  )(snapshot);

  self.postMessage({
    bestState,
  });
};

function minimax(state, depth, isMaximizing) {
  if (depth === 0 || state.score > 0) {
    return state;
  }

  const { side, timeline, node } = state;
  const [snapshot] = timeline;
  const codeList = snapshot.filter(startsWith(Opponent[side]));

  if (isMaximizing) {
    let bestState = {
      score: -Infinity,
    };

    codeList.forEach(
      compose(
        forEach((nextState) => {
          const finalState = minimax(nextState, depth - 1, false);

          if (finalState.score > bestState.score) {
            bestState = finalState;
          }
        }),
        predictScore(timeline, node)
      )
    );

    return bestState;
  } else {
    let bestState = {
      score: Infinity,
    };

    codeList.forEach(
      compose(
        forEach((nextState) => {
          const finalState = minimax(nextState, depth - 1, true);

          if (finalState.score < bestState.score) {
            bestState = finalState;
          }
        }),
        predictScore(timeline, node)
      )
    );

    return bestState;
  }
}
