import { curry, filter } from 'ramda';
import { detectPiece } from './detect-piece';
import { validateSnapshot } from './validate-snapshot';

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

  return filter(detectPiece(piece), codeList);
}

const getEqualPiecesCurried = curry(getEqualPieces);
export { getEqualPiecesCurried as getEqualPieces };
