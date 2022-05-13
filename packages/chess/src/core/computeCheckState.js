import {
  curry,
  compose,
  flip,
  concat,
  flatten,
  reject,
  isEmpty,
  nth,
} from 'ramda';
import computePossibleMT from './computePossibleMT';
import getAttackerRoutes from './getAttackerRoutes';
import findAttacker from './findAttacker';
import getDefenders from './getDefenders';
import getDodgeableTiles from './getDodgeableTiles';
import removePredictTiles from './internal/removePredictTiles';
import { filterOpponent, findOpponentKing, pretendTo } from '../utils';

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

  const flippedGetMT = flip(computePossibleMT(attackerCode, attackerRoutes))(
    timeline
  );

  return {
    // this for every piece movable tiles of King side
    dodgeableTiles: compose(
      concat(dodgeableTiles),
      flatten,
      reject(compose(isEmpty, flippedGetMT)),
      filterOpponent(opponentCode), // opponent's opponent
      nth(0)
    )(timeline),

    kingCode,
    attackerCode,
    attackerRoutes,
    defendTiles,
    defenders,
  };
}

export default curry(computeCheckState);
