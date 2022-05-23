import { curry } from 'ramda';
import parseCode from './parseCode';
import { King, Pawn } from '../presets';

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

export default _detectPiece;
