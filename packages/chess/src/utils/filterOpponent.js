import { curry, filter } from 'ramda';
import detectOpponent from './detectOpponent';

/**
 * Filter opponent
 * @param  {String} code
 * @param  {Array}  snapshot
 * @return {Array}
 */
function filterOpponent(code, snapshot) {
  return filter(detectOpponent(code), snapshot);
}

export default curry(filterOpponent);
