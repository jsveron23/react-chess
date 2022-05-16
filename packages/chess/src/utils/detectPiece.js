import { curry, equals, compose, prop } from 'ramda';
import parseCode from './parseCode';

/**
 * Detect expect piece
 * @param  {String}  piece
 * @param  {String}  code
 * @return {Boolean}
 */
function detectPiece(piece, code) {
  return compose(equals(piece), prop('piece'), parseCode)(code);
}

export default curry(detectPiece);
