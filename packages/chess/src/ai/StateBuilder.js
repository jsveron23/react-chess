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
import { computePossibleMT } from '../core';
import {
  parseCode,
  detectPiece,
  replaceCode,
  getDirection,
  findCodeByTile,
  computeDistance,
} from '../utils';
import { Vertical } from '../presets';

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
    this.mt = computePossibleMT(
      this.attackerCode,
      this.attackerRoutes,
      this.currCode,
      this.timeline
    );
    [this.side, this.pKey] = compose(
      props(['side', 'pKey']),
      parseCode
    )(this.currCode);
  }

  static prepare(iV) {
    return new StateBuilder(iV);
  }

  /**
   * Build states
   * @return {Array} states
   */
  build() {
    return compose(filter(Boolean), map(this.#buildState))(this.mt);
  }

  #buildState = (tileName) => {
    const code = this.#findCode(tileName);
    const isSameSided = this.#detectSameSide(code);

    // ignore same sided code
    if (isSameSided) {
      return;
    }

    // TODO if captured in different depth, it also said captured
    const isCaptured = !!code && !isSameSided;
    const nextCode = `${this.pKey}${tileName}`;
    let pretendCode = '';

    if (isCaptured) {
      const direction = this.#getDirection(nextCode);
      const noCapture = this.isPawn && direction === Vertical;

      if (noCapture) {
        return;
      }

      pretendCode = this.#getPretendCode(tileName);
    }

    return {
      node: this.#getNextNode(nextCode),
      timeline: this.#getNextTimeline(nextCode),
      side: this.side,
      pretendCode,
      isCaptured,
    };
  };

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
}

export default StateBuilder;
