import { curry, compose, and, includes, cond, T, always } from 'ramda';
import detectOpponent from './detectOpponent';
import detectPiece from './detectPiece';
import removeDirection from './removeDirection';

/**
 * Detect eneny on the way
 * @param  {Array}   movableTiles
 * @param  {String}  selectedCode
 * @param  {String}  targetCode
 * @param  {String}  tile
 * @return {Boolean}
 */
function detectEnemyOnTiles(movableTiles, selectedCode, targetCode, tile) {
  return compose(
    and(detectOpponent(selectedCode, targetCode)),
    includes(tile),
    cond([
      [detectPiece.Pawn, removeDirection.Vertical(movableTiles)],
      [T, always(movableTiles)],
    ])
  )(selectedCode);
}

export default curry(detectEnemyOnTiles);
