import { curry } from 'ramda';
import { parseCode } from './parse-code';
import { transformInto } from './transform-into';

/**
 * Pretend specific piece but other meta will same
 * @param  {String} originalCode
 * @param  {String} targetCode
 * @return {String}
 */
function pretendTo(originalCode, targetCode) {
  return transformInto(parseCode.prop('piece', targetCode), originalCode);
}

const pretendToCurried = curry(pretendTo);
export { pretendToCurried as pretendTo };