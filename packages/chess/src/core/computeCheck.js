import { curry, compose } from 'ramda';
import getAttackerRoutes from './getAttackerRoutes';
import findAttacker from './findAttacker';
import getDefenders from './getDefenders';
import getDodgeableTiles from './getDodgeableTiles';
import { findYourKing, pretendTo } from '../utils';

/**
 * Compute whether Check or not
 * @param  {String} selectedCode opponent (moved code)
 * @param  {Array}  timeline
 * @return {Object}
 */
function computeCheck(selectedCode, timeline) {
  const kingCode = findYourKing(selectedCode, timeline);
  const attackerCode = findAttacker(kingCode, timeline);
  let attackerRoutes = [];
  let defenders = [];
  let defendTiles = [];
  let dodgeableTiles = [];

  // check
  if (attackerCode) {
    // match same movement of piece but same tile as King
    attackerRoutes = compose(
      getAttackerRoutes(timeline, attackerCode),
      pretendTo(kingCode)
    )(attackerCode);

    const grp = getDefenders(attackerCode, timeline, attackerRoutes);
    dodgeableTiles = getDodgeableTiles(timeline, attackerCode, kingCode);

    defenders = grp.of;
    defendTiles = grp.tiles;
  }

  return {
    kingCode,
    attackerCode,
    attackerRoutes,
    dodgeableTiles,
    defendTiles,
    defenders,
  };
}

export default curry(computeCheck);
