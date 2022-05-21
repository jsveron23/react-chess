import { curry, compose, prop } from 'ramda';
import { parseTile } from '../utils';
import { Side, Rank, Queen, Knight } from '../presets';

/**
 * Get promotion code
 * TODO apply every kind of piece
 * @param  {String} piece
 * @param  {String} side
 * @param  {String} tileName
 * @return {String}
 */
function getPromotionCode(piece, side, tileName) {
  const rankName = compose(prop('rankName'), parseTile)(tileName);
  const rankIdx = Rank.indexOf(rankName);
  const isIt = {
    [Side.w]: rankIdx === 0,
    [Side.b]: rankIdx === Rank.length - 1,
  };

  return isIt[side] ? `${side}${piece}${tileName}` : '';
}

const _getPromotionCode = curry(getPromotionCode);

_getPromotionCode.Queen = _getPromotionCode(Queen);
_getPromotionCode.Knight = _getPromotionCode(Knight);

export default _getPromotionCode;
