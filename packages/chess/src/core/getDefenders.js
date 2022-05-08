import {
  curry,
  compose,
  flip,
  reduce,
  isEmpty,
  nth,
  map,
  prop,
  uniq,
  flatten,
  reject,
  startsWith,
  intersection,
} from 'ramda';
import computeFinalMT from './computeFinalMT';
import { filterOpponent, parseCode, detectPiece } from '../utils';
import { Pawn } from '../presets';

/**
 * Get defender tiles and defender code list
 * @param  {String} code
 * @param  {Array}  timeline
 * @param  {Array}  movableTiles
 * @return {Object}
 */
function getDefenders(code, timeline, movableTiles) {
  const { tileName } = parseCode(code);

  const group = compose(
    reduce((acc, cd) => {
      let defendableTiles = compose(
        intersection(movableTiles),
        flip(computeFinalMT)(timeline)
      )(cd);

      const isPawn = detectPiece(Pawn, cd);

      if (isPawn) {
        const { fileName } = parseCode(cd);

        defendableTiles = reject((tN) => {
          return startsWith(fileName, tN) && tN === tileName;
        }, defendableTiles);
      }

      if (isEmpty(defendableTiles)) {
        return acc;
      }

      return [
        ...acc,
        {
          code: cd, // defender
          defendableTiles,
        },
      ];
    }, []),
    filterOpponent(code),
    nth(0)
  )(timeline);

  return {
    defenders: map(prop('code'), group),
    tiles: compose(uniq, flatten, map(prop('defendableTiles')))(group),
  };
}

export default curry(getDefenders);
