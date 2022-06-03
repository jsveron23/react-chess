import { Side } from 'chess/es';
import AI from './AI';

self.onmessage = ({ data }) => {
  const { timeline, turn, depth = 2 } = data;
  let bestState = {
    score: -Infinity,
  };

  console.time('worker');
  // prettier-ignore
  AI
    .set({ timeline, char: Side[turn] })
    .run((nextState) => {
      const finalState = AI.minimax(
        nextState,
        depth - 1,
        -Infinity,
        Infinity,
        false
      );

      if (finalState.score >= bestState.score) {
        bestState = finalState;
      }
    });
  console.timeEnd('worker');

  self.postMessage({
    bestState,
  });
};
