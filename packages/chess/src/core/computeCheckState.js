import {
  curry,
  compose,
  flip,
  concat,
  flatten,
  reject,
  isEmpty,
  map,
} from 'ramda';
import computePossibleMT from './computePossibleMT';
import getAttackerRoutes from './getAttackerRoutes';
import findAttacker from './findAttacker';
import getDefenders from './getDefenders';
import getDodgeableTiles from './getDodgeableTiles';
import removePredictTiles from './internal/removePredictTiles';
import {
  filterOpponent,
  findOpponentKing,
  pretendTo,
  convertCodeToTile,
} from '../utils';

/**
 * Compute whether Check or not (entry function)
 * @param  {String} opponentCode after moved
 * @param  {Array}  timeline
 * @return {Object}
 */
function computeCheckState(opponentCode, timeline) {
  const [snapshot] = timeline;
  const kingCode = findOpponentKing(opponentCode, snapshot);
  const attackerCode = findAttacker(kingCode, timeline);
  let attackerRoutes = [];
  let defenders = [];
  let defendTiles = [];
  let dodgeableTiles = [];

  // check
  if (attackerCode) {
    // match same movement of piece but same tile as King
    // King's movement will be attacker movement
    // TODO optimize it
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

  // TODO simplify it
  const _getPMT = flip(computePossibleMT(attackerCode, attackerRoutes))(
    timeline
  );

  return {
    // every pieces movable tiles of King side
    // TODO compute wrong
    dodgeableTiles: compose(
      concat(dodgeableTiles),
      map(convertCodeToTile),
      flatten,
      reject(compose(isEmpty, _getPMT)),
      filterOpponent(opponentCode) // opponent's opponent
    )(snapshot),

    kingCode,
    attackerCode,
    attackerRoutes,
    defendTiles,
    defenders,
  };
}

export default curry(computeCheckState);
