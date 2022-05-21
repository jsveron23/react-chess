import { curry, includes } from 'ramda';
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
  // pawn naver have enemy on vertical tile
  const isPawn = detectPiece.Pawn(selectedCode);
  const filteredMt = isPawn
    ? removeDirection.Vertical(movableTiles, selectedCode)
    : movableTiles;

  const isEnemy = detectOpponent(selectedCode, targetCode);
  const isOTW = includes(tile, filteredMt);

  return isOTW && isEnemy;
}

export default curry(detectEnemyOnTiles);
