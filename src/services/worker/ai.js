import { isEmpty } from 'ramda';
import { Side, createTimeline, AI, StateBuilder } from 'chess/es';

self.onmessage = ({ data }) => {
  const {
    present: { checkData },
    depth = 2,
    present,
    past,
  } = data;

  // Clear TT, killers, and history once at the start of each CPU turn.
  // Do NOT clear between ID iterations — accumulated state improves ordering.
  AI.clearSearchState();

  const iV = StateBuilder.createInitialV({
    timeline: createTimeline(present, past),
    side: Side[present.turn],
    ...checkData,
  });
  const isAIMaximizer = iV.side === Side.w;
  const codeList = AI.createList(iV.side, iV.snapshot);
  const stateList = [];

  for (let i = 0, len = codeList.length; i < len; i++) {
    const state = StateBuilder.of(iV).build(codeList[i]);

    if (!isEmpty(state)) {
      stateList.push(...state);
    }
  }

  // Run one root search pass at depth d within [a, b].
  // Returns { score, state } for the best root move found.
  const searchRoot = (d, a, b) => {
    const orderedList = AI.orderMoves(stateList, d - 1);
    let bestScore = isAIMaximizer ? -9999 : 9999;
    let bestRootState = null;
    let alpha = a;
    let beta = b;

    for (let i = 0, len = orderedList.length; i < len; i++) {
      const state = orderedList[i];
      let score;

      if (i === 0) {
        // First root move: full window to establish the principal variation.
        score = AI.minimax(state, d - 1, alpha, beta, !isAIMaximizer);
      } else {
        // PVS: null window first; re-search at full window if it fails high.
        const pvAlpha = isAIMaximizer ? alpha : beta - 1;
        const pvBeta = isAIMaximizer ? alpha + 1 : beta;
        score = AI.minimax(state, d - 1, pvAlpha, pvBeta, !isAIMaximizer);
        const failsHigh = isAIMaximizer ? score > alpha : score < beta;
        if (failsHigh) {
          score = AI.minimax(state, d - 1, alpha, beta, !isAIMaximizer);
        }
      }

      if (isAIMaximizer ? score > bestScore : score < bestScore) {
        bestScore = score;
        bestRootState = state;
      }

      if (isAIMaximizer) alpha = Math.max(alpha, bestScore);
      else beta = Math.min(beta, bestScore);
    }

    return { score: bestScore, state: bestRootState };
  };

  let bestState = null;
  let aspirationScore = null;
  const ASPIRATION_DELTA = 50;

  // Iterative deepening: search depth 1 → depth in sequence.
  // Each iteration seeds TT / killers / history for the next, so move ordering
  // improves with each pass — this is what makes PVS effective at full depth.
  // Aspiration windows: from d=2 onward, try a narrow window around the
  // previous iteration's score first; widen to full window only on failure.
  for (let d = 1; d <= depth; d++) {
    let result;

    if (d >= 2 && aspirationScore !== null) {
      const lo = aspirationScore - ASPIRATION_DELTA;
      const hi = aspirationScore + ASPIRATION_DELTA;
      result = searchRoot(d, lo, hi);

      // Score fell outside the window — re-search with full bounds.
      if (result.score <= lo || result.score >= hi) {
        result = searchRoot(d, -10000, 10000);
      }
    } else {
      result = searchRoot(d, -10000, 10000);
    }

    aspirationScore = result.score;
    if (result.state !== null) {
      bestState = result.state;
    }
  }

  self.postMessage({
    bestState,
  });
};
