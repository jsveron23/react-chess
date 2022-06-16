import { Side, createTimeline, AI } from 'chess/es';

self.onmessage = ({ data }) => {
  // NOTE
  // first depth for player (not cpu)
  // but root is for cpu, which mean `bestState` is for cpu
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
    .of({ timeline, checkData, side: Side[present.turn] })
    .iter((generatedState) => {
      const finalState = AI.minimax(
        generatedState,
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
