import { curry, equals } from 'ramda';

/**
 * Find code from snapshot array
 * @param  {Array}  snapshot
 * @param  {String} code
 * @return {String}
 */
function findCode(snapshot, code) {
  return snapshot.find(equals(code));
}

export default curry(findCode);
