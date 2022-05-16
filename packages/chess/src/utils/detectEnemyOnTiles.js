import { curry } from 'ramda';
import detectOpponent from './detectOpponent';
import detectPiece from './detectPiece';
import detectTileOnTiles from './detectTileOnTiles';
import removeDirection from './removeDirection';
import { Pawn, Vertical } from '../presets';

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
  const isPawn = detectPiece(Pawn, selectedCode);
  const filteredMt = isPawn
    ? removeDirection(Vertical, movableTiles, selectedCode)
    : movableTiles;

  const isEnemy = detectOpponent(selectedCode, targetCode);
  const isOTW = detectTileOnTiles(tile, filteredMt);

  return isOTW && isEnemy;
}

export default curry(detectEnemyOnTiles);
