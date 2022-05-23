import { curry } from 'ramda';
import parseCode from './parseCode';
import transformInto from './transformInto';

/**
 * Pretend specific piece but other meta will same
 * @param  {String} originalCode
 * @param  {String} targetCode
 * @return {String}
 */
function pretendTo(originalCode, targetCode) {
  return transformInto(parseCode.prop('piece', targetCode), originalCode);
}

export default curry(pretendTo);
