import { curry, compose, reduce, filter, defaultTo, flip, prop } from 'ramda';
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
 * @param  {Array}  timeline
 * @param  {String} code
 * @return {Array}
 */
function computeSpecialMT(timeline, code) {
  return compose(
    filter(Boolean),
    reduce((acc, mvName) => {
      switch (mvName) {
        case Castling: {
          // TODO

          return acc;
        }

        case DoubleStep: {
          const oneMoreTile = getDoubleStepTile(code);

          return [...acc, oneMoreTile];
        }

        case Diagonally: {
          const [snapshot] = timeline;
          const capturableTiles = getDiagonallyTiles(code, snapshot);

          return [...acc, ...capturableTiles];
        }

        case EnPassant: {
          const diagonalTile = getEnPassantTile(code, timeline);

          return [...acc, diagonalTile];
        }

        default: {
          return acc;
        }
      }
    }, []),
    defaultTo([]),
    flip(prop)(Special),
    prop('piece'),
    parseCode
  )(code);
}

export default curry(computeSpecialMT);
