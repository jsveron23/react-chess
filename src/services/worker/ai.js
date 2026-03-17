import { isEmpty } from 'ramda';
import { Side, createTimeline, AI, StateBuilder } from 'chess/es';

self.onmessage = ({ data }) => {
  const {
    present: { checkData },
    depth = 2,
    present,
    past,
  } = data;

  // Clear transposition table and killer moves from any previous search.
  // (Each worker message is a fresh CPU turn, so we start with a clean slate.)
  AI.clearSearchState();

  const iV = StateBuilder.createInitialV({
    timeline: createTimeline(present, past),
    side: Side[present.turn],
    ...checkData,
  });
  const isAIMaximizer = iV.side === Side.w;
  const codeList = AI.createList(iV.side, iV.snapshot);
  const stateList = [];
  let bestMove = isAIMaximizer ? -9999 : 9999;
  let bestState = null;

  for (let i = 0, len = codeList.length; i < len; i++) {
    const state = StateBuilder.of(iV).build(codeList[i]);

    if (!isEmpty(state)) {
      stateList.push(...state);
    }
  }

  const orderedList = AI.orderMoves(stateList);
  let alpha = -10000;
  let beta = 10000;

  for (let i = 0, len = orderedList.length; i < len; i++) {
    const state = orderedList[i];
    const score = AI.minimax(state, depth - 1, alpha, beta, !isAIMaximizer);

    if (isAIMaximizer ? score > bestMove : score < bestMove) {
      bestMove = score;
      bestState = state;
    }

    if (isAIMaximizer) alpha = Math.max(alpha, bestMove);
    else beta = Math.min(beta, bestMove);
  }

  self.postMessage({
    bestState,
  });
};
