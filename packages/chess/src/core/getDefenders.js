import {
  curry,
  compose,
  reduce,
  isEmpty,
  nth,
  map,
  prop,
  uniq,
  flatten,
  reject,
  equals,
  allPass,
  startsWith,
  intersection,
} from 'ramda';
import computeFinalMT from './computeFinalMT';
import { filterOpponent, parseCode, detectPiece } from '../utils';
import { Pawn, King } from '../presets';

/**
 * Get defender tiles and defender code list
 * @param  {String} attackerCode
 * @param  {Array}  timeline
 * @param  {Array}  routes
 * @return {Object}
 */
function getDefenders(attackerCode, timeline, routes) {
  const { tileName } = parseCode(attackerCode);
  const grpList = compose(
    reduce((acc, cd) => {
      const isPawn = detectPiece(Pawn, cd);
      const isKing = detectPiece(King, cd);
      const mt = computeFinalMT(timeline, cd);
      let defendableTiles = intersection(routes, mt);

      if (isKing) {
        defendableTiles = [];
      }

      if (isPawn) {
        const { fileName } = parseCode(cd);

        defendableTiles = reject(
          allPass([startsWith(fileName), equals(tileName)]),
          defendableTiles
        );
      }

      return isEmpty(defendableTiles)
        ? acc
        : [
            ...acc,
            {
              code: cd, // defender
              defendableTiles,
            },
          ];
    }, []),
    filterOpponent(attackerCode),
    nth(0)
  )(timeline);

  return {
    of: map(prop('code'), grpList),
    tiles: compose(uniq, flatten, map(prop('defendableTiles')))(grpList),
    itself: grpList,
  };
}

export default curry(getDefenders);
