import { curry } from 'ramda';
import parseCode from './parseCode';

/**
 * Transform into provided piece but same meta
 * @param  {String} piece
 * @param  {String} code
 * @return {String}
 */
function transformInto(piece, code) {
  const { side, tileName } = parseCode(code);

  return `${side}${piece}${tileName}`;
}

export default curry(transformInto);
