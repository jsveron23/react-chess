import { curry, compose, includes, and } from 'ramda';
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
  // Pawn naver have enemy on vertical tile
  const filteredMt = detectPiece.Pawn(selectedCode)
    ? removeDirection.Vertical(movableTiles, selectedCode)
    : movableTiles;

  return compose(
    and(includes(tile, filteredMt)),
    detectOpponent(selectedCode)
  )(targetCode);
}

export default curry(detectEnemyOnTiles);
