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
  const { tileName: attackerTileName } = parseCode(attackerCode);
  const grpList = compose(
    reduce((acc, cd) => {
      const mt = computeFinalMT(timeline, cd);
      let defendableTiles = intersection(routes, mt);

      if (detectPiece(Pawn, cd)) {
        const { fileName } = parseCode(cd);

        // if vertical direction then remove it
        defendableTiles = reject(
          allPass([startsWith(fileName), equals(attackerTileName)]),
          defendableTiles
        );
      }

      return isEmpty(defendableTiles) || detectPiece(King, cd)
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
    of: grpList.map(prop('code')),
    tiles: compose(uniq, flatten, map(prop('defendableTiles')))(grpList),
    self: grpList,
  };
}

export default curry(getDefenders);
