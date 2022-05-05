import { curry, compose, prop } from 'ramda';
import { parseTile } from '../utils';
import { Side, Rank } from '../presets';

/**
 * Get promotion code
 * @param  {String} tileName
 * @param  {String} side
 * @return {String}
 */
function getPromotionCode(tileName, side) {
  const rankName = compose(Number, prop('rankName'), parseTile)(tileName);
  const rankIdx = Rank.indexOf(rankName);
  const isIt = {
    [Side.w]: rankIdx === 0,
    [Side.b]: rankIdx === Rank.length,
  };

  return isIt[side] ? `${side}Q${tileName}` : '';
}

export default curry(getPromotionCode);
