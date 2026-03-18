import { curry, filter } from 'ramda';
import { detectOpponent } from './detect-opponent';
import { validateSnapshot } from './validate-snapshot';

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

const filterOpponentCurried = curry(filterOpponent);
export { filterOpponentCurried as filterOpponent };
