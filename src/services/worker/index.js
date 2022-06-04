import { Side, createTimeline } from 'chess/es';
import AI from './AI';

self.onmessage = ({ data }) => {
  const {
    present: { checkData },
    depth = 2,
    present,
    past,
  } = data;
  const timeline = createTimeline(present, past);
  let bestState = {
    score: -Infinity,
  };

  console.time('worker');
  // prettier-ignore
  AI
    .prepare({ timeline, checkData, char: Side[present.turn] })
    .run((nextState) => {
      const finalState = AI.minimax(
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
