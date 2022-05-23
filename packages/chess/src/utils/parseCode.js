import { compose, prop, equals, curry } from 'ramda';
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

parseCode.eq = curry((kV, code) => {
  const [key, val] = kV;

  return compose(equals(val), prop(key), parseCode)(code);
});

parseCode.prop = curry((key, code) => {
  return compose(prop(key), parseCode)(code);
});

export default parseCode;
