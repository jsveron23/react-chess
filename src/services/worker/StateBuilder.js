import {
  compose,
  filter,
  map,
  prepend,
  flip,
  allPass,
  propEq,
  apply,
  props,
} from 'ramda';
import {
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

class StateBuilder {
  constructor(iV) {
    this.node = iV.node;
    this.timeline = iV.timeline;
    this.snapshot = iV.snapshot;
    this.currCode = iV.currCode;
    this.enemySide = iV.enemySide;
    this.attackerCode = iV.attackerCode || '';
    this.attackerRoutes = iV.attackerRoutes || [];
    this.isPawn = detectPiece.Pawn(this.currCode);

    [this.side, this.pKey] = compose(
      props(['side', 'pKey']),
      parseCode
    )(this.currCode);
  }

  build() {
    return compose(
      filter(Boolean),
      map((tN) => {
        const code = this.#findCode(tN);
        const isSameSided = this.#detectSameSide(code);

        // ignore same sided code
        if (isSameSided) {
          return;
        }

        // TODO if captured in different depth, it also said captured
        const isCaptured = !!code && !isSameSided;
        const nextCode = `${this.pKey}${tN}`;
        const direction = this.#getDirection(nextCode);
        let pretendCode = '';

        if (isCaptured) {
          // not possible to capture
          if (this.isPawn && direction === Vertical) {
            return;
          }

          pretendCode = this.#getPretendCode(tN);
        }

        return {
          node: this.#getNextNode(nextCode),
          timeline: this.#getNextTimeline(nextCode),
          side: this.side,
          pretendCode,
          isCaptured,
        };
      }),
      computePossibleMT(this.attackerCode, this.attackerRoutes, this.currCode)
    )(this.timeline);
  }

  #getNextNode(nextCode) {
    return [...this.node, this.currCode, nextCode];
  }

  #findCode(tileName) {
    return findCodeByTile(this.snapshot, tileName);
  }

  #detectSameSide(code) {
    return compose(propEq('side', this.side), parseCode)(code);
  }

  #getPretendCode(tileName) {
    const _allPass = allPass([
      propEq('side', this.enemySide),
      propEq('tileName', tileName),
    ]);

    return this.snapshot.find(compose(_allPass, parseCode));
  }

  #getDirection(nextCode) {
    return compose(
      apply(getDirection),
      props(['file', 'rank']),
      computeDistance(this.currCode)
    )(nextCode);
  }

  // TODO incorrect timeline
  #getNextTimeline(nextCode) {
    return compose(
      _prepend(this.timeline),
      replaceCode(this.snapshot, this.currCode) // TODO it's only for move (no capturing)
    )(nextCode);
  }

  static prepare(initialValues) {
    return new StateBuilder(initialValues);
  }
}

export default StateBuilder;
