import { curry, equals, compose, prop } from 'ramda';
import parseCode from './parseCode';

/**
 * Detect expect piece
 * @param  {String}  piece
 * @param  {String}  code
 * @return {Boolean}
 */
function detectPiece(piece, code) {
  return equals(piece, compose(prop('piece'), parseCode)(code));
}

export default curry(detectPiece);
