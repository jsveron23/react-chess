import { head, isEmpty, filter, startsWith } from 'ramda';
import { Opponent, Side, createTimeline, AI, StateBuilder } from 'chess/es';

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
  const snapshot = head(timeline);
  const side = Side[present.turn];
  const codeList = filter(startsWith(side), snapshot);
  let bestState = {
    score: -Infinity,
  };

  console.time('worker');
  for (let i = 0, len = codeList.length; i < len; i++) {
    const generatedStates = StateBuilder.prepare({
      enemySide: Opponent[side], // current depth's state enemy
      currCode: codeList[i],
      node: [],
      timeline,
      snapshot,
      ...checkData,
    }).build();

    if (!isEmpty(generatedStates)) {
      for (let j = 0, len = generatedStates.length; j < len; j++) {
        const finalState = AI.minimax(
          generatedStates[j],
          depth - 1,
          -Infinity,
          Infinity,
          false
        );

        if (finalState.score > bestState.score) {
          bestState = finalState;
        }
      }
    }
  }
  console.timeEnd('worker');

  // console.time('worker');
  // prettier-ignore
  // AI
  //   .of({ timeline, checkData, side: Side[present.turn] })
  //   .iter((generatedState) => {
  //     const finalState = AI.minimax(
  //       generatedState,
  //       depth - 1,
  //       -Infinity,
  //       Infinity,
  //       false
  //     );
  //
  //     if (finalState.score > bestState.score) {
  //       bestState = finalState;
  //     }
  //   });
  // console.timeEnd('worker');

  self.postMessage({
    bestState,
  });
};
