import { curry, compose, prop } from 'ramda';
import { parseTile } from '../utils';
import { Side, Rank, Queen } from '../presets';

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

  return isIt[side] ? `${side}${Queen}${tileName}` : '';
}

export default curry(getPromotionCode);
