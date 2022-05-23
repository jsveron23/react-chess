import { curry, equals } from 'ramda';
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

  return snapshot.find(equals(code));
}

export default curry(findCode);
