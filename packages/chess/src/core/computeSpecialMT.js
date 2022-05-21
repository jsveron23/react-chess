import { curry, compose, reduce, filter, defaultTo, flip, prop } from 'ramda';
import getDoubleStepTile from './getDoubleStepTile';
import getEnPassantTile from './getEnPassantTile';
import getDiagonallyTiles from './getDiagonallyTiles';
import { parseCode } from '../utils';
import { Special, DoubleStep, Diagonally, EnPassant } from '../presets';

/**
 * Compute special movable tiles
 * @param  {Array}  timeline
 * @param  {String} code
 * @return {Array}
 */
function computeSpecialMT(timeline, code) {
  const [snapshot] = timeline;

  return compose(
    filter(Boolean),
    reduce((acc, mvName) => {
      switch (mvName) {
        case DoubleStep: {
          return [...acc, getDoubleStepTile(code)];
        }

        case Diagonally: {
          return [...acc, ...getDiagonallyTiles(code, snapshot)];
        }

        case EnPassant: {
          return [...acc, getEnPassantTile(code, timeline)];
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
