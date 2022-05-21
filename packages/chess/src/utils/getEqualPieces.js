import { curry } from 'ramda';
import detectPiece from './detectPiece';
import validateSnapshot from './validateSnapshot';

/**
 * Get pieces
 * @param  {String} piece
 * @param  {Array}  codeList snapshot
 * @return {Array}
 */
function getEqualPieces(piece, codeList) {
  if (!validateSnapshot(codeList)) {
    throw new TypeError('invalid arguments');
  }

  return codeList.filter(detectPiece(piece));
}

export default curry(getEqualPieces);
