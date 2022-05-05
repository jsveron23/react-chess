import { curry, compose, reduce, filter } from 'ramda';
import getDoubleStepTile from './getDoubleStepTile';
import getEnPassantTile from './getEnPassantTile';
import getDiagonallyTiles from './getDiagonallyTiles';
import { parseCode } from '../utils';
import {
  Special,
  Castling,
  DoubleStep,
  Diagonally,
  EnPassant,
} from '../presets';

/**
 * Compute special movable tiles
 * @param  {String} code
 * @param  {Array}  timeline
 * @return {Array}
 */
function computeSpecialMT(code, timeline) {
  const { piece: sPiece } = parseCode(code);
  const mvs = Special[sPiece];

  if (!mvs) {
    return [];
  }

  const _reduceFn = (state, mvName) => {
    switch (mvName) {
      case Castling: {
        // TODO

        return state;
      }

      case DoubleStep: {
        const oneMoreTile = getDoubleStepTile(code);

        return [...state, oneMoreTile];
      }

      case Diagonally: {
        const [snapshot] = timeline;
        const capturableTiles = getDiagonallyTiles(code, snapshot);

        return [...state, ...capturableTiles];
      }

      case EnPassant: {
        const diagonalTile = getEnPassantTile(code, timeline);

        return [...state, diagonalTile];
      }

      default: {
        return state;
      }
    }
  };

  return compose(filter(Boolean), reduce(_reduceFn, []))(mvs);
}

export default curry(computeSpecialMT);
