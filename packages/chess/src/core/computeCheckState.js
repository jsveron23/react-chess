import { curry, compose, props, head, union } from 'ramda';
import getAttackerRoutes from './getAttackerRoutes';
import getAttackers from './getAttackers';
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
  const kingCode = compose(findOpponentKing(opponentCode), head)(timeline);
  const attackerCodes = getAttackers(kingCode, timeline);
  const attackerCode = head(attackerCodes); // one is enough
  const onlyOneAttacker = attackerCodes.length === 1;
  let attackerRoutes = [];
  let defenders = [];
  let defendTiles = [];
  let dodgeableTiles = [];

  // check
  if (attackerCode) {
    attackerRoutes = attackerCodes.reduce((acc, code) => {
      return compose(
        union(acc),
        getAttackerRoutes(timeline, code),
        pretendTo(kingCode)
      )(code);
    }, []);

    // dodge by King
    dodgeableTiles = compose(
      removePredictTiles(timeline, kingCode),
      getDodgeableTiles(timeline, attackerCode, kingCode)
    )(attackerRoutes);

    // King defenders
    if (onlyOneAttacker) {
      [defenders, defendTiles] = compose(
        props(['of', 'tiles']),
        getDefenders(attackerCode, timeline)
      )(attackerRoutes);
    }
  }

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
