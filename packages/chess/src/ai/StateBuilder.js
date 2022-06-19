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
  head,
  reject,
  equals,
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
import { Opponent, Vertical } from '../presets';

const _prepend = flip(prepend);

class StateBuilder {
  constructor(iV) {
    this.timeline = iV.timeline;
    this.snapshot = iV.snapshot;
    this.enemySide = iV.enemySide;
    this.node = iV.node || [];
    this.attackerCode = iV.attackerCode || '';
    this.attackerRoutes = iV.attackerRoutes || [];
  }

  static of(iV) {
    return new StateBuilder(iV);
  }

  static createInitialV(state) {
    const { timeline, side } = state;
    const snapshot = head(timeline);

    return {
      enemySide: Opponent[side],
      snapshot,
      ...state,
    };
  }

  /**
   * Build states
   * @return {Array} states
   */
  build(currCode) {
    this.currCode = currCode;
    this.isPawn = detectPiece.Pawn(this.currCode);
    [this.side, this.pKey] = compose(
      props(['side', 'pKey']),
      parseCode
    )(this.currCode);

    return compose(
      filter(Boolean),
      map(this.#buildState),
      computePossibleMT(this.attackerCode, this.attackerRoutes, this.currCode)
    )(this.timeline);
  }

  #buildState = (tileName) => {
    const code = findCodeByTile(this.snapshot, tileName);
    const isSameSided = compose(propEq('side', this.side), parseCode)(code);

    if (isSameSided) {
      return;
    }

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
      timeline: this.#getNextTimeline(nextCode, pretendCode, isCaptured),
      node: [...this.node, this.currCode, nextCode],
      side: this.side,
      pretendCode,
      isCaptured,
    };
  };

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

  #getNextTimeline(nextCode, pretendCode, isCaptured) {
    let getNextSnapshot = null;

    if (isCaptured) {
      getNextSnapshot = compose(
        reject(equals(this.currCode)),
        replaceCode(this.snapshot, pretendCode)
      );
    } else {
      getNextSnapshot = replaceCode(this.snapshot, this.currCode);
    }

    return compose(_prepend(this.timeline), getNextSnapshot)(nextCode);
  }
}

export default StateBuilder;
