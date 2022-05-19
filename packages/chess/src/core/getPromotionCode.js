import { curry, compose, prop } from 'ramda';
import { parseTile } from '../utils';
import { Side, Rank } from '../presets';

/**
 * Get promotion code
 * @param  {String} piece
 * @param  {String} tileName
 * @param  {String} side
 * @return {String}
 */
function getPromotionCode(piece, tileName, side) {
  const rankName = compose(Number, prop('rankName'), parseTile)(tileName);
  const rankIdx = Rank.indexOf(rankName);
  const isIt = {
    [Side.w]: rankIdx === 0,
    [Side.b]: rankIdx === Rank.length - 1,
  };

  return isIt[side] ? `${side}${piece}${tileName}` : '';
}

export default curry(getPromotionCode);
