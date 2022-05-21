import { curry, equals, compose, prop } from 'ramda';
import parseCode from './parseCode';
import { King, Pawn, Knight } from '../presets';

/**
 * Detect expect piece
 * @param  {String}  piece
 * @param  {String}  code
 * @return {Boolean}
 */
function detectPiece(piece, code) {
  return compose(equals(piece), prop('piece'), parseCode)(code);
}

const _detectPiece = curry(detectPiece);

_detectPiece.King = _detectPiece(King);
_detectPiece.Knight = _detectPiece(Knight);
_detectPiece.Pawn = _detectPiece(Pawn);

export default _detectPiece;
