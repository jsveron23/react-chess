import { curry, update, cond, always, identity, T } from 'ramda';
import validateCode from './validateCode';
import validateSnapshot from './validateSnapshot';

/**
 * Replace code
 * @param  {Array}  snapshot
 * @param  {String} currCode
 * @param  {String} nextCode
 * @return {Array}
 */
function replaceCode(snapshot, currCode, nextCode) {
  const invalidCode = !validateCode(currCode) || !validateCode(nextCode);

  if (invalidCode || !validateSnapshot(snapshot)) {
    return snapshot || [];
  }

  const idx = snapshot.indexOf(currCode);

  return cond([
    [always(idx > -1), update(idx, nextCode)],
    [T, identity],
  ])(snapshot);
}

export default curry(replaceCode);
