import {
  compose,
  filter,
  map,
  prepend,
  flip,
  apply,
  props,
  head,
  reject,
  equals,
} from 'ramda';
import { computePossibleMT, computeRawMT } from '../core';
import {
  detectPiece,
  replaceCode,
  getDirection,
  computeDistance,
} from '../utils';
import { Opponent, Vertical } from '../presets';

const _prepend = flip(prepend);

class StateBuilder {
  constructor(iV) {
    this.timeline = iV.timeline;
    this.snapshot = iV.snapshot;
    this.tileMap = iV.tileMap;
    this.enemySide = iV.enemySide;
    this.node = iV.node || [];
    this.attackerCode = iV.attackerCode || '';
    this.attackerRoutes = iV.attackerRoutes || [];
  }

  /**
   * Create a StateBuilder instance.
   * @param {object} iV - Initial values
   * @return {StateBuilder} New StateBuilder instance
   */
  static of(iV) {
    return new StateBuilder(iV);
  }

  /**
   * Create initial state variables from game state.
   * @param {object} state - Game state
   * @return {object} Initial values object
   */
  static createInitialV(state) {
    const { timeline, side } = state;
    const snapshot = head(timeline);
    const tileMap = new Map(snapshot.map((code) => [code.slice(2), code]));

    return {
      enemySide: Opponent[side],
      snapshot,
      tileMap,
      ...state,
    };
  }

  /**
   * Build capture-only states using pseudo-legal move generation (no pin detection).
   * Used in quiescence search for performance — avoids expensive predictPossibleCheck.
   * @param {string} currCode - Current piece code
   * @return {Array} capture states only
   */
  buildCaptures(currCode) {
    this.currCode = currCode;
    this.isPawn = detectPiece.Pawn(this.currCode);
    this.side = currCode[0];
    this.pKey = currCode.slice(0, 2);

    // computeRawMT: fast move generation without pin/check detection
    const rawTiles = computeRawMT(this.timeline, this.currCode);

    // Keep only tiles that have an enemy piece (potential captures)
    const captureTiles = rawTiles.filter((tile) => {
      const code = this.tileMap.get(tile);

      return code !== undefined && code[0] !== this.side;
    });

    return compose(filter(Boolean), map(this.#buildState))(captureTiles);
  }

  /**
   * Build states
   * @param {string} currCode - Current piece code
   * @return {Array} states
   */
  build(currCode) {
    this.currCode = currCode;
    this.isPawn = detectPiece.Pawn(this.currCode);
    this.side = currCode[0];
    this.pKey = currCode.slice(0, 2);

    return compose(
      filter(Boolean),
      map(this.#buildState),
      computePossibleMT(this.attackerCode, this.attackerRoutes, this.currCode)
    )(this.timeline);
  }

  #buildState = (tileName) => {
    const code = this.tileMap.get(tileName);

    if (code && code[0] === this.side) {
      return;
    }

    const isCaptured = !!code;
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
      side: Opponent[this.side],
      pretendCode,
      isCaptured,
    };
  };

  /**
   * Get the pretend code for a captured tile.
   * @param {string} tileName - Target tile name
   * @return {string} Pretend piece code
   */
  #getPretendCode(tileName) {
    return this.tileMap.get(tileName);
  }

  /**
   * Get move direction from current code to next code.
   * @param {string} nextCode - Next piece code
   * @return {string} Direction identifier
   */
  #getDirection(nextCode) {
    return compose(
      apply(getDirection),
      props(['file', 'rank']),
      computeDistance(this.currCode)
    )(nextCode);
  }

  /**
   * Build the next timeline after a move.
   * @param {string} nextCode - Next piece code
   * @param {string} pretendCode - Captured piece code (if any)
   * @param {boolean} isCaptured - Whether a capture occurred
   * @return {Array} Updated timeline
   */
  #getNextTimeline(nextCode, pretendCode, isCaptured) {
    // Castling map: king destination → rook (curr → next)
    const CastlingMap = {
      wKc1: { curr: 'wRa1', next: 'wRd1' },
      wKg1: { curr: 'wRh1', next: 'wRf1' },
      bKc8: { curr: 'bRa8', next: 'bRd8' },
      bKg8: { curr: 'bRh8', next: 'bRf8' },
    };

    let getNextSnapshot = null;

    if (isCaptured) {
      getNextSnapshot = compose(
        reject(equals(this.currCode)),
        replaceCode(this.snapshot, pretendCode)
      );
    } else {
      getNextSnapshot = replaceCode(this.snapshot, this.currCode);
    }

    let nextSnapshot = getNextSnapshot(nextCode);

    // If king castled (moved 2 files), also reposition the rook
    if (detectPiece.King(this.currCode)) {
      const { file } = computeDistance(this.currCode, nextCode);

      if (file === 2) {
        const codeMap = CastlingMap[nextCode];

        if (codeMap) {
          nextSnapshot = replaceCode(nextSnapshot, codeMap.curr, codeMap.next);
        }
      }
    }

    return _prepend(this.timeline)(nextSnapshot);
  }
}

export { StateBuilder };