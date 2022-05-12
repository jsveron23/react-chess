import { curry, compose } from 'ramda';
import getAttackerRoutes from './getAttackerRoutes';
import findAttacker from './findAttacker';
import getDefenders from './getDefenders';
import getDodgeableTiles from './getDodgeableTiles';
import removePredictTiles from './internal/removePredictTiles';
import { findOpponentKing, pretendTo } from '../utils';

/**
 * Compute whether Check or not (entry function)
 * @param  {String} opponentCode after moved
 * @param  {Array}  timeline
 * @return {Object}
 */
function computeCheckState(opponentCode, timeline) {
  const kingCode = findOpponentKing(opponentCode, timeline);
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

    // King
    dodgeableTiles = compose(
      removePredictTiles(timeline, kingCode),
      getDodgeableTiles(timeline, attackerCode, kingCode)
    )(attackerRoutes);

    // not King (defenders)
    const grp = getDefenders(attackerCode, timeline, attackerRoutes);

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

export default curry(computeCheckState);
