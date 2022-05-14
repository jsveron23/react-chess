import { curry, equals, find } from 'ramda';

/**
 * Find code
 * @param  {Array}  snapshot
 * @param  {String} code
 * @return {String}
 */
function findCode(snapshot, code) {
  return find(equals(code), snapshot);
}

export default curry(findCode);
