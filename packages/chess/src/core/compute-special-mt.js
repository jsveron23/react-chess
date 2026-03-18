import {
  curry,
  compose,
  map,
  flatten,
  filter,
  defaultTo,
  flip,
  prop,
  head,
} from 'ramda';
import { getDoubleStepTile } from './get-double-step-tile';
import { getEnPassantTile } from './get-en-passant-tile';
import { getDiagonallyTiles } from './get-diagonally-tiles';
import { parseCode } from '../utils';
import { Special, DoubleStep, Diagonally, EnPassant } from '../presets';

const _propSpecial = flip(prop)(Special);

/**
 * Compute special movable tiles
 * @param  {Array}  timeline
 * @param  {String} code
 * @return {Array}
 */
function computeSpecialMT(timeline, code) {
  return compose(
    filter(Boolean),
    flatten,
    map((mvName) => {
      switch (mvName) {
        case DoubleStep: {
          return compose(getDoubleStepTile(code), head)(timeline);
        }

        case Diagonally: {
          return compose(getDiagonallyTiles(code), head)(timeline);
        }

        case EnPassant: {
          return getEnPassantTile(code, timeline);
        }

        default: {
          return '';
        }
      }
    }),
    defaultTo([]),
    _propSpecial,
    parseCode.prop('piece')
  )(code);
}

const computeSpecialMTCurried = curry(computeSpecialMT);
export { computeSpecialMTCurried as computeSpecialMT };
