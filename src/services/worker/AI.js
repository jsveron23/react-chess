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
  apply,
  props,
} from 'ramda';
import {
  Opponent,
  Vertical,
  parseCode,
  detectPiece,
  replaceCode,
  getDirection,
  findCodeByTile,
  computeDistance,
  computePossibleMT,
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
   * @see AI.prepare
   * @param {Function} cb
   */
  run(cb) {
    // iterate(cb -> minimax) in iterate(get movable tiles of a code)
    // until depth is zero
    compose(
      forEach(compose(forEach(cb), this.#generateState)),
      filter(startsWith(this.char))
    )(this.snapshot);
  }

  /**
   * Generate state for each depth by code, check possible scenario
   * @param  {String} currCode
   * @return {Object} state
   */
  #generateState = (currCode) => {
    const { side, pKey } = parseCode(currCode);
    const enemySide = Opponent[this.char];
    const isPawn = detectPiece.Pawn(currCode);
    const { attackerCode = '', attackerRoutes = [] } = this.checkData;
    const _getDirection = compose(
      apply(getDirection),
      props(['file', 'rank']),
      computeDistance(currCode)
    );
    const _getNextTimeline = compose(
      _prepend(this.timeline),
      replaceCode(this.snapshot, currCode) // TODO it's only for move (no capturing)
    );

    return compose(
      filter(Boolean),
      map((tN) => {
        const code = findCodeByTile(this.snapshot, tN);
        const isSameSidedTile = compose(equals(side), _toSide)(code);

        // ignore same sided code
        if (isSameSidedTile) {
          return;
        }

        const isCaptured = !!code && !isSameSidedTile;
        const nextCode = `${pKey}${tN}`;
        const direction = _getDirection(nextCode);
        let pretendCode = '';

        if (isCaptured) {
          // not possible to capture
          if (isPawn && direction === Vertical) {
            return;
          }

          pretendCode = this.snapshot.find((cd) => {
            const { side: cdSide, tileName } = parseCode(cd);

            return and(equals(tN, tileName), equals(enemySide, cdSide));
          });
        }

        return {
          node: [...this.node, currCode, nextCode],
          timeline: _getNextTimeline(nextCode), // TODO incorrect timeline
          pretendCode,
          isCaptured,
          side,
        };
      }),
      computePossibleMT(attackerCode, attackerRoutes, currCode)
    )(this.timeline);
  };

  /**
   * Evaluate state
   * @param  {Object} state
   * @return {Object} state + evaluated state
   */
  static #evaluateState(state) {
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
  }

  /**
   * Create instance
   * @param  {Object} initialValues
   * @return {AI}     instance
   */
  static prepare(initialValues) {
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
    const inSituation =
      state.isCaptured ||
      state.isCheck ||
      state.isCheckmate ||
      state.isStalemate;

    if (depth === 0 || inSituation) {
      return this.#evaluateState(state);
    }

    let bestState = {
      ...state,
      score: isMaximizing ? -Infinity : Infinity,
    };

    // prettier-ignore
    AI
      .prepare({ ...state, char: Opponent[state.side] })
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
