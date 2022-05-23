import { curry } from 'ramda';
import detectOpponent from './detectOpponent';
import validateSnapshot from './validateSnapshot';

/**
 * Filter opponent
 * @param  {String} code
 * @param  {Array}  snapshot
 * @return {Array}
 */
function filterOpponent(code, snapshot) {
  if (!validateSnapshot(snapshot)) {
    throw new TypeError('invalid argument');
  }

  return snapshot.filter(detectOpponent(code));
}

export default curry(filterOpponent);
