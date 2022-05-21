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
  const { tileName: attackerTileName } = parseCode(attackerCode);
  const _computeMT = computeRawMT(timeline);
  const _getDefendableTiles = intersection(routes);
  const grpList = compose(
    reduce((acc, code) => {
      let defendableTiles = compose(_getDefendableTiles, _computeMT)(code);

      if (detectPiece.Pawn(code)) {
        // if vertical direction then remove it
        defendableTiles = reject(
          allPass([
            compose(startsWith, prop('fileName'), parseCode)(code),
            equals(attackerTileName),
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
