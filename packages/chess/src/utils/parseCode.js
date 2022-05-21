import parseTile from './parseTile';
import validateCode from './validateCode';

/**
 * Parse code
 * @param  {String} code
 * @return {Object}
 */
function parseCode(code) {
  if (!validateCode(code)) {
    return {};
  }

  const [side, piece, fileName, rankName] = code.split('');

  return {
    ...parseTile(`${fileName}${rankName}`),
    pKey: `${side}${piece}`,
    code,
    side,
    piece,
  };
}

export default parseCode;
