import { curry } from 'ramda';
import parseCode from './parseCode';

/**
 * Pretend specific peice but other meta will same
 * @param  {String} originalCode
 * @param  {String} targetCode
 * @return {String}
 */
function pretendAs(originalCode, targetCode) {
  const { side, tileName } = parseCode(originalCode);
  const { piece } = parseCode(targetCode);

  return `${side}${piece}${tileName}`;
}

export default curry(pretendAs);
