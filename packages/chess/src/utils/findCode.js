import { curry, equals, find } from 'ramda';
import validateSnapshot from './validateSnapshot';

/**
 * Find code
 * @param  {Array}  snapshot
 * @param  {String} code
 * @return {String}
 */
function findCode(snapshot, code) {
  if (!validateSnapshot(snapshot)) {
    return '';
  }

  return find(equals(code), snapshot);
}

export default curry(findCode);
