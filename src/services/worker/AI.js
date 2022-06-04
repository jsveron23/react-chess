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
  and,
} from 'ramda';
import {
  Opponent,
  computePossibleMT,
  parseCode,
  replaceCode,
  findCodeByTile,
} from 'chess/es';

const _prepend = flip(prepend);
const _toPKey = parseCode.prop('pKey');
const _toSide = parseCode.prop('side');

class AI {
  // TODO evaluate
  static Scores = {
    wP: 10,
    wN: 30,
    wB: 30,
    wR: 50,
    wQ: 90,
    wK: 900,
    bP: -10,
    bN: -30,
    bB: -30,
    bR: -50,
    bQ: -90,
    bK: -900,
  };

  constructor(initialValues) {
    this.timeline = initialValues.timeline;
    this.snapshot = head(this.timeline);
    this.checkData = initialValues.checkData || {};
    this.node = initialValues.node || [];
    this.char = initialValues.char;
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
   * Compute possible scenario
   * @param  {Object} rawState
   * @return {Object}
   */
  #computeScenario = (rawState) => {
    const { currCode, nextCode, nextTile, isCaptured } = rawState;
    let pretendCode = '';

    if (isCaptured) {
      pretendCode = this.#detectPretendCode(nextTile);
    }

    return {
      node: [...this.node, currCode, nextCode],
      timeline: this.#generateNextTimeline(currCode, nextCode), // TODO incorrect timeline
      pretendCode,
      ...rawState,
    };
  };

  /**
   * Generate state for each depth by code
   * @param  {String} currCode
   * @return {Object} state
   */
  #generateState = (currCode) => {
    const { side, pKey } = parseCode(currCode);
    const { attackerCode = '', attackerRoutes = [] } = this.checkData;

    return compose(
      filter(Boolean),
      map((tN) => {
        const code = findCodeByTile(this.snapshot, tN);
        const isSameSidedTile = this.#detectPlacedTile(code, side, tN);

        if (isSameSidedTile) {
          // no need this state
          return;
        }

        return this.#computeScenario({
          isCaptured: !!code && !isSameSidedTile,
          nextCode: `${pKey}${tN}`,
          nextTile: tN,
          currCode,
          side,
        });
      }),
      computePossibleMT(attackerCode, attackerRoutes, currCode)
    )(this.timeline);
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
   * @param  {String}  code
   * @param  {String}  side
   * @return {Boolean}
   */
  #detectPlacedTile = (code, side) => compose(equals(side), _toSide)(code);

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
   * PretendCode === defenderCode when capturing
   * @param  {String} nextTile
   * @return {String}
   */
  #detectPretendCode = (nextTile) => {
    return this.snapshot.find((code) => {
      const { side, tileName } = parseCode(code);

      return and(equals(Opponent[this.char], side), equals(nextTile, tileName));
    });
  };

  /**
   * Evaluate state
   * @param  {Object} state
   * @return {Object} state + evaluated state
   */
  static #evaluateState = (state) => {
    const { node = [], pretendCode, isCaptured } = state;
    const [selectedCode] = node;
    // let penalty = 0;
    let score = -1;

    if (isCaptured) {
      const selectedPKey = _toPKey(selectedCode);
      const pretendPKey = _toPKey(pretendCode);

      // TODO better
      score = this.Scores[selectedPKey] - this.Scores[pretendPKey];
    }

    // TODO more

    return {
      ...state,
      score: score > -1 ? score : -Math.floor(Math.random() * 10),
    };
  };

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
   * @return {Object}
   */
  static minimax(state, depth, alpha, beta, isMaximizing) {
    // TODO check it
    const isWinning =
      state.isCaptured ||
      state.isCheck ||
      state.isCheckmate ||
      state.isStalemate;

    if (depth === 0 || isWinning) {
      return this.#evaluateState(state);
    }

    let bestState = {
      ...state,
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
          bestState = {
            ...nextState,
            score: nextState.score
          };
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
