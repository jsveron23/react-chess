import { curry, compose, nth } from 'ramda';
import detectAttackerRoutes from './detectAttackerRoutes';
import findAttacker from './findAttacker';
import getDefenders from './getDefenders';
import { getEqualPiece, pretendTo, filterOpponent } from '../utils';
import { King } from '../presets';

/**
 * Compute whether Check or not
 * @param  {String} selectedCode opponent (moved code)
 * @param  {Array}  timeline
 * @return {Object}
 */
function computeCheck(selectedCode, timeline) {
  const kingCode = compose(
    nth(0),
    getEqualPiece(King),
    filterOpponent(selectedCode),
    nth(0)
  )(timeline);
  const attackerCode = findAttacker(kingCode, timeline);
  let attackerRoutes = [];
  let defenders = [];
  let defendTiles = [];

  // check
  if (attackerCode) {
    // match same movement of piece but same tile as King
    attackerRoutes = compose(
      detectAttackerRoutes(timeline, attackerCode),
      pretendTo(kingCode)
    )(attackerCode);

    const grp = getDefenders(attackerCode, timeline, attackerRoutes);
    defenders = grp.of;
    defendTiles = grp.tiles;
  }

  return {
    kingCode,
    attackerCode,
    attackerRoutes,
    defendTiles,
    defenders,
  };
}

export default curry(computeCheck);
