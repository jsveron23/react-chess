import {
  curry,
  compose,
  prop,
  flip,
  indexOf,
  applySpec,
  equals,
  cond,
  T,
  always,
} from 'ramda';
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
  return compose(
    cond([
      [prop(side), always(`${side}${piece}${tileName}`)],
      [T, always('')],
    ]),
    applySpec({
      [Side.w]: equals(0),
      [Side.b]: equals(Rank.length - 1),
    }),
    flip(indexOf)(Rank),
    Number,
    prop('rankName'),
    parseTile
  )(tileName);
}

export default curry(getPromotionCode);
