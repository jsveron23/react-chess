import { curry, indexOf, subtract } from 'ramda';

/**
 * Get subtraction
 * @param  {String|Number} a
 * @param  {String|Number} b
 * @param  {Array}         list
 * @return {Number}
 */
function getSubtraction(a, b, list) {
  return subtract(indexOf(a, list), indexOf(b, list));
}

export default curry(getSubtraction);
