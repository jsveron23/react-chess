import { curry, compose, equals, prop } from 'ramda';
import parseCode from './parseCode';
import { King } from '../presets';

/**
 * Find King
 * @param  {String} code
 * @param  {Array}  snapshot
 * @return {String}
 */
function findKing(code, snapshot) {
  const { side } = parseCode(code);

  return find(
    compose(equals(`${side}${King}`), prop('pKey'), parseCode),
    snapshot
  );
}

export default curry(findKing);
