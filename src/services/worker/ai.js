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

  /**
   * Generate all legal child states from the given state for the side to move.
   * Mirrors the move-generation pattern used in minimax.
   * @param {object} state - Current position state
   * @return {Array} Flat list of child states
   */
  const getChildren = (state) => {
    const iV = StateBuilder.createInitialV(state);
    const codeList = AI.createList(iV.side, iV.snapshot);
    const result = [];
    for (let i = 0; i < codeList.length; i++) {
      const s = StateBuilder.of(iV).build(codeList[i]);
      if (s.length > 0) result.push(...s);
    }

    
return result;
  };

  /**
   * Pick the best child state from a position using static evaluation only
   * (no recursive search — fast enough for tree display purposes).
   * Evaluates up to 15 ordered candidates and returns the state + score
   * that is best for the given side.
   * @param {object} parentState - Position to expand
   * @param {boolean} isMax - True if the side to move maximises the score
   * @return {{ state: object, score: number }|null}
   */
  const pickBestChild = (parentState, isMax) => {
    const children = getChildren(parentState);
    if (children.length === 0) return null;
    const ordered = AI.orderMoves(children);
    let bestChild = null;
    let bestScore = isMax ? -Infinity : Infinity;
    const limit = Math.min(ordered.length, 15);
    for (let i = 0; i < limit; i++) {
      const child = ordered[i];
      const score = AI.evaluateBreakdown(child).total;
      if (isMax ? score > bestScore : score < bestScore) {
        bestScore = score;
        bestChild = child;
      }
    }

    
return bestChild ? { state: bestChild, score: bestScore } : null;
  };

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

  /**
   * Build the decision tree: top 4 CPU candidates, each with the opponent's
   * best reply (static eval greedy), and for the chosen move only, the CPU's
   * best counter to that reply.
   *
   * Each node: { node, score, isCaptured, pretendCode, isChosen, reply }
   * reply node: { node, score, isCaptured, pretendCode, counter }
   * counter node: { node, score, isCaptured, pretendCode }
   */
  const decisionTree = sortedMoves.slice(0, 4).map(({ state, score }, idx) => {
    const isChosen = idx === 0;

    const replyResult = pickBestChild(state, !isAIMaximizer);
    let reply = null;

    if (replyResult) {
      const { state: replyState, score: replyScore } = replyResult;
      let counter = null;

      if (isChosen) {
        const counterResult = pickBestChild(replyState, isAIMaximizer);
        if (counterResult) {
          // Depth 4: opponent's reply to CPU's counter
          let counterReply = null;
          const reply2Result = pickBestChild(
            counterResult.state,
            !isAIMaximizer
          );
          if (reply2Result) {
            // Depth 5: CPU's counter to opponent's depth-4 reply
            let counter2 = null;
            const counter2Result = pickBestChild(
              reply2Result.state,
              isAIMaximizer
            );
            if (counter2Result) {
              counter2 = {
                node: counter2Result.state.node,
                score: counter2Result.score,
                isCaptured: counter2Result.state.isCaptured,
                pretendCode: counter2Result.state.pretendCode || '',
              };
            }
            counterReply = {
              node: reply2Result.state.node,
              score: reply2Result.score,
              isCaptured: reply2Result.state.isCaptured,
              pretendCode: reply2Result.state.pretendCode || '',
              counter: counter2,
            };
          }
          counter = {
            node: counterResult.state.node,
            score: counterResult.score,
            isCaptured: counterResult.state.isCaptured,
            pretendCode: counterResult.state.pretendCode || '',
            reply: counterReply,
          };
        }
      }

      reply = {
        node: replyState.node,
        score: replyScore,
        isCaptured: replyState.isCaptured,
        pretendCode: replyState.pretendCode || '',
        counter,
      };
    }

    return {
      node: state.node,
      score,
      isCaptured: state.isCaptured,
      pretendCode: state.pretendCode || '',
      isChosen,
      reply,
    };
  });

  self.postMessage({
    bestState,
    score: aspirationScore,
    topMoves,
    breakdown,
    decisionTree,
  });
};
