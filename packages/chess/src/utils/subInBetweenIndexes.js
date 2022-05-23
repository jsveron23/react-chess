import { curry, indexOf, subtract } from 'ramda';

/**
 * Subtract indexs between fileA(rankA) and fileB(rankB)
 * @param  {String|Number} a
 * @param  {String|Number} b
 * @param  {Array}         base
 * @return {Number}
 */
function subInBetweenIndexes(a, b, base) {
  return subtract(indexOf(a, base), indexOf(b, base));
}

export default curry(subInBetweenIndexes);
