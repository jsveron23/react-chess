import {
  curry,
  compose,
  without,
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
import {
  filterOpponent,
  parseCode,
  detectPiece,
  computeDistance,
} from '../utils';
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

      // TODO maybe compute as standalone
      // King cannot be a defender
      // but he can avoid tiles of routes
      if (isKing) {
        const isContacted = compose(
          prop('contact'),
          computeDistance(attackerCode)
        )(cd);

        if (isContacted) {
          // TODO if contact, capture atker but need to detect protector
        } else {
          const removeTile = intersection(defendableTiles, routes);

          defendableTiles = without(removeTile, defendableTiles);
        }
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
