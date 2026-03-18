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

  /**
   * Run one root search pass at depth d within the window [a, b].
   * Applies PVS: the first move gets the full window; subsequent moves use a
   * null window and are re-searched at full width only on a fail-high.
   * Collects a scored list of all root moves for later top-move extraction.
   * @param {number} d - Search depth for this iteration
   * @param {number} a - Alpha bound
   * @param {number} b - Beta bound
   * @return {{ score: number, state: object|null, scoredList: Array<{state: object, score: number}> }}
   */
  const searchRoot = (d, a, b) => {
    const orderedList = AI.orderMoves(stateList, d - 1);
    const scoredList = [];
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

      scoredList.push({ state, score });

      if (isAIMaximizer ? score > bestScore : score < bestScore) {
        bestScore = score;
        bestRootState = state;
      }

      if (isAIMaximizer) alpha = Math.max(alpha, bestScore);
      else beta = Math.min(beta, bestScore);
    }

    return { score: bestScore, state: bestRootState, scoredList };
  };

  let bestState = null;
  let aspirationScore = null;
  let finalScoredList = [];
  const ASPIRATION_DELTA = 50;

  // Iterative deepening: search depth 1 → depth in sequence.
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
      finalScoredList = result.scoredList;
    }
  }

  // Build top moves: sort by score (best for CPU first), take top 5
  const sortedMoves = [...finalScoredList].sort((a, b) =>
    isAIMaximizer ? b.score - a.score : a.score - b.score
  );
  const topMoves = sortedMoves.slice(0, 5).map(({ state, score }) => ({
    node: state.node,
    score,
    isCaptured: state.isCaptured,
    pretendCode: state.pretendCode || '',
  }));

  // Compute eval breakdown for the chosen position
  const breakdown = bestState ? AI.evaluateBreakdown(bestState) : null;

  self.postMessage({
    bestState,
    score: aspirationScore,
    topMoves,
    breakdown,
  });
};
