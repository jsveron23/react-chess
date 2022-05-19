import { curry, indexOf } from 'ramda';

/**
 * Get distance
 * @param  {String|Number} a
 * @param  {String|Number} b
 * @param  {Array}         list
 * @return {Number}
 */
function getDistance(a, b, list) {
  return indexOf(a, list) - indexOf(b, list);
}

export default curry(getDistance);
