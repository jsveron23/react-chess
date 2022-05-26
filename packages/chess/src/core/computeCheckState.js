import {
  curry,
  compose,
  flip,
  concat,
  flatten,
  reject,
  isEmpty,
  head,
  nth,
  union,
} from 'ramda';
import computePossibleMT from './computePossibleMT';
import getAttackerRoutes from './getAttackerRoutes';
import getAttackers from './getAttackers';
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
  const kingCode = compose(findOpponentKing(opponentCode), nth(0))(timeline);
  const attackerCodes = getAttackers(kingCode, timeline);
  const attackerCode = head(attackerCodes);
  let attackerRoutes = [];
  let defenders = [];
  let defendTiles = [];
  let dodgeableTiles = [];

  // check
  if (attackerCode) {
    // match same movement of piece but same tile as King
    attackerRoutes = attackerCodes.reduce((acc, code) => {
      return compose(
        union(acc),
        getAttackerRoutes(timeline, code),
        pretendTo(kingCode)
      )(code);
    }, []);

    // King
    dodgeableTiles = compose(
      removePredictTiles(timeline, kingCode),
      getDodgeableTiles(timeline, attackerCode, kingCode)
    )(attackerRoutes);

    // not King (defenders)
    // TODO refactoring (legacy)
    if (attackerCodes.length === 1) {
      const grp = getDefenders(attackerCode, timeline, attackerRoutes);

      defenders = grp.of;
      defendTiles = grp.tiles;
    }
  }

  const _getPMT = flip(computePossibleMT(attackerCode, attackerRoutes))(
    timeline
  );

  return {
    // every pieces movable tiles of King side
    // TODO compute wrong
    dodgeableTiles: compose(
      concat(dodgeableTiles),
      flatten,
      reject(compose(isEmpty, _getPMT)),
      filterOpponent(opponentCode), // opponent's opponent
      nth(0)
    )(timeline),

    attackerCode, // NOTE for legacy logic
    kingCode,
    attackerRoutes,
    defendTiles,
    defenders,
  };
}

export default curry(computeCheckState);
