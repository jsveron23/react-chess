import { curry } from 'ramda';
import { parseCode } from './parse-code';
import { King, Knight, Pawn } from '../presets';

/**
 * Detect expect piece
 * @param  {String}  piece
 * @param  {String}  code
 * @return {Boolean}
 */
function detectPiece(piece, code) {
  return parseCode.eq(['piece', piece], code);
}

const _detectPiece = curry(detectPiece);

_detectPiece.King = _detectPiece(King);
_detectPiece.Pawn = _detectPiece(Pawn);
_detectPiece.Knight = _detectPiece(Knight);

export { _detectPiece as detectPiece };