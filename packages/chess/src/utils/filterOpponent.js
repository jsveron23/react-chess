import { curry, filter } from 'ramda';
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

  return filter(detectOpponent(code), snapshot);
}

export default curry(filterOpponent);
