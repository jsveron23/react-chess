import { curry, compose, props, head, union, flatten, map } from 'ramda';
import computePossibleMT from './computePossibleMT';
import getAttackerRoutes from './getAttackerRoutes';
import getAttackers from './getAttackers';
import getDefenders from './getDefenders';
import {
  findOpponentKing,
  pretendTo,
  detectPiece,
  removeDirection,
  filterOpponent,
} from '../utils';

/**
 * Compute whether Check or not (entry function)
 * @param  {String} opponentCode after moved
 * @param  {Array}  timeline
 * @return {Object}
 */
function computeCheckState(opponentCode, timeline) {
  const kingCode = compose(findOpponentKing(opponentCode), head)(timeline);
  const attackerCodes = getAttackers(kingCode, timeline);
  const attackerCode = head(attackerCodes) || ''; // one is enough
  const onlyOneAttacker = attackerCodes.length === 1;
  let attackerRoutes = [];
  let defenders = [];
  let defendTiles = [];

  if (attackerCode) {
    attackerRoutes = attackerCodes.reduce((acc, code) => {
      return compose(
        union(acc),
        getAttackerRoutes(timeline, code),
        pretendTo(kingCode)
      )(code);
    }, []);

    // King defenders
    if (onlyOneAttacker) {
      [defenders, defendTiles] = compose(
        props(['of', 'tiles']),
        getDefenders(attackerCode, timeline)
      )(attackerRoutes);
    }
  }

  // all pieces mt
  const dodgeableTiles = compose(
    flatten,
    map((code) => {
      let pmt = computePossibleMT(attackerCode, attackerRoutes, code, timeline);

      if (detectPiece.Pawn(code)) {
        pmt = removeDirection.Vertical(pmt, code);
      }

      return pmt;
    }),
    filterOpponent(opponentCode),
    head
  )(timeline);

  return {
    kingCode,
    defenders,
    defendTiles,
    attackerCode,
    attackerRoutes,
    dodgeableTiles,
  };
}

export default curry(computeCheckState);
