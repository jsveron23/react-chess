import { curry } from 'ramda';
import {
  detectOpponent,
  detectPiece,
  detectTileOTW,
  removeDirection,
} from '../utils';
import { Pawn, Vertical } from '../presets';

/**
 * Detect eneny on the way
 * @param  {Array}   movableTiles
 * @param  {String}  selectedCode
 * @param  {String}  pretendCode
 * @param  {String}  tileName
 * @return {Boolean}
 */
function detectEnemyOTW(movableTiles, selectedCode, pretendCode, tileName) {
  // pawn naver have enemy on vertical tile
  const isPawn = detectPiece(Pawn, selectedCode);
  const filteredMt = isPawn
    ? removeDirection(Vertical, movableTiles, selectedCode)
    : movableTiles;

  const isEnemy = detectOpponent(selectedCode, pretendCode);
  const isOTW = detectTileOTW(tileName, filteredMt);

  return isOTW && isEnemy;
}

export default curry(detectEnemyOTW);
