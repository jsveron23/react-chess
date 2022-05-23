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
import computeRawMT from './computeRawMT';
import { filterOpponent, parseCode, detectPiece } from '../utils';

/**
 * Get defenders for defending attacking routes(+ attacker tile)
 * @param  {String} attackerCode
 * @param  {Array}  timeline
 * @param  {Array}  routes
 * @return {Object}
 */
function getDefenders(attackerCode, timeline, routes) {
  const grpList = compose(
    reduce((acc, code) => {
      const mt = computeRawMT(timeline, code);
      let defendableTiles = intersection(routes, mt);

      if (detectPiece.Pawn(code)) {
        // if vertical direction then remove it
        defendableTiles = reject(
          allPass([
            compose(startsWith, parseCode.prop('fileName'))(code),
            compose(equals, parseCode.prop('tileName'))(attackerCode),
          ]),
          defendableTiles
        );
      }

      return isEmpty(defendableTiles) || detectPiece.King(code)
        ? acc
        : [
            ...acc,
            {
              code, // defender
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
