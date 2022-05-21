import { curry, compose, prop, flip } from 'ramda';
import parseCode from './parseCode';
import transformInto from './transformInto';

/**
 * Pretend specific piece but other meta will same
 * @param  {String} originalCode
 * @param  {String} targetCode
 * @return {String}
 */
function pretendTo(originalCode, targetCode) {
  return compose(
    flip(transformInto)(originalCode),
    prop('piece'),
    parseCode
  )(targetCode);
}

export default curry(pretendTo);
