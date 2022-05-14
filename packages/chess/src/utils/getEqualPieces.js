import { compose, curry, equals, prop, filter } from 'ramda';
import parseCode from './parseCode';
import validateSnapshot from './validateSnapshot';

/**
 * Get pieces
 * @param  {String} piece
 * @param  {Array}  codeList snapshot
 * @return {Array}
 */
function getEqualPieces(piece, codeList) {
  if (!validateSnapshot(codeList)) {
    throw new TypeError(`invalid argument | codeList: ${codeList}`);
  }

  const _extractPiece = compose(equals(piece), prop('piece'), parseCode);

  return filter(_extractPiece, codeList);
}

export default curry(getEqualPieces);
