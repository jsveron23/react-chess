import {
  curry,
  compose,
  reduce,
  filter,
  defaultTo,
  flip,
  prop,
  head,
} from 'ramda';
import getDoubleStepTile from './getDoubleStepTile';
import getEnPassantTile from './getEnPassantTile';
import getDiagonallyTiles from './getDiagonallyTiles';
import { parseCode } from '../utils';
import { Special, DoubleStep, Diagonally, EnPassant } from '../presets';

const _prop = flip(prop);

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
        case DoubleStep: {
          const oneMoreTile = getDoubleStepTile(code);

          return [...acc, oneMoreTile];
        }

        case Diagonally: {
          const capturableTiles = compose(
            getDiagonallyTiles(code),
            head
          )(timeline);

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
    _prop(Special),
    parseCode.prop('piece')
  )(code);
}

export default curry(computeSpecialMT);
