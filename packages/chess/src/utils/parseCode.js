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
    pKey: `${side}${piece}`,
    tileName: `${fileName}${rankName}`,
    code,
    side,
    piece,
    fileName,
    rankName,
  };
}

export default parseCode;
