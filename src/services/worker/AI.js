import {
  compose,
  forEach,
  filter,
  startsWith,
  head,
  map,
  prepend,
  flip,
  equals,
} from 'ramda';
import {
  Opponent,
  computeRawMT,
  parseCode,
  replaceCode,
  findCodeByTile,
} from 'chess/es';

const _prepend = flip(prepend);

class AI {
  // TODO evaluate
  static Scores = {
    wP: 100,
    wN: 350,
    wB: 350,
    wR: 525,
    wQ: 1000,
    wK: 10000,
    bP: -100,
    bN: -350,
    bB: -350,
    bR: -525,
    bQ: -1000,
    bK: -10000,
  };

  constructor(initialValues) {
    this.timeline = initialValues.timeline;
    this.snapshot = head(this.timeline);
    this.char = initialValues.char;
    this.node = initialValues.node || [];
  }

  /**
   * Entry point of this class
   * @see worker
   * @see AI.set
   * @param {Function} cb
   */
  run(cb) {
    compose(this.#filterState(cb), this.#filterBySide)();
  }

  /**
   * Generate state for each depth by code
   * @param  {String} code
   * @return {Object} state
   */
  #generateState = (code) => {
    const { side, pKey } = parseCode(code);

    return compose(
      filter(Boolean),
      map((tN) => {
        if (this.#detectPlacedTile(side, tN)) {
          return;
        }

        const nextCode = `${pKey}${tN}`;

        // TODO
        // move | capture | predict attacker | pawn vertical
        // check | checkmate | stalemate

        return {
          node: [...this.node, code, nextCode],
          timeline: this.#generateNextTimeline(code, nextCode),
          side,
        };
      }),
      computeRawMT(this.timeline)
    )(code);
  };

  /**
   * Generate next timeline in state after
   * @param  {String} currCode
   * @param  {String} nextCode
   * @return {Array}
   */
  #generateNextTimeline = (currCode, nextCode) =>
    compose(
      _prepend(this.timeline),
      replaceCode(this.snapshot, currCode)
    )(nextCode);

  /**
   * Detect placed tile to remove unnecessary case (same sided only)
   * @param  {String}  side
   * @param  {String}  tile
   * @return {Boolean}
   */
  #detectPlacedTile = (side, tile) =>
    compose(
      equals(side),
      parseCode.prop('side'),
      findCodeByTile(this.snapshot)
    )(tile);

  /**
   * Filter snapshot to remove opponent side
   * @return {Array}
   */
  #filterBySide = () => filter(startsWith(this.char), this.snapshot);

  /**
   * Filter available state (curry)
   * @param  {Function} cb
   * @return {Function}
   */
  #filterState = (cb) => forEach(compose(forEach(cb), this.#generateState));

  /**
   * Create instance
   * @param  {Object} initialValues
   * @return {AI}     instance
   */
  static set(initialValues) {
    return new AI(initialValues);
  }

  /**
   * Minimax Algorithm
   * @param  {Object}  state
   * @param  {Number}  depth
   * @param  {Number}  alpha
   * @param  {Number}  beta
   * @param  {Boolean} isMaximizing
   * @return {Object}  state + evaluated state
   */
  static minimax(state, depth, alpha, beta, isMaximizing) {
    const isWinning =
      state.isCaptured ||
      state.isCheck ||
      state.isCheckmate ||
      state.isStalemate;

    if (depth === 0 || isWinning) {
      // TODO evaluateState
      return {
        ...state,
        score: Math.random() * 100,
      };
    }

    let bestState = {
      score: isMaximizing ? -Infinity : Infinity,
    };

    // prettier-ignore
    AI
      .set({ ...state, char: Opponent[state.side] })
      .run((filteredState) => {
        const nextState = this.minimax(
          filteredState,
          depth - 1,
          alpha,
          beta,
          !isMaximizing
        );
        const cond = isMaximizing
          ? nextState.score > bestState.score
          : nextState.score < bestState.score;

        if (cond) {
          bestState = nextState;
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
}

export default AI;
