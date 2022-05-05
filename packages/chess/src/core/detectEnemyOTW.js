import { curry, reject, startsWith } from 'ramda';
import {
  parseCode,
  detectOpponent,
  detectPiece,
  detectTileOTW,
} from '../utils';
import { Pawn } from '../presets';

/**
 * Detect eneny on the way
 * @param  {Array}   movableTiles
 * @param  {String}  selectedCode
 * @param  {String}  pretendCode
 * @param  {String}  tileName
 * @return {Boolean}
 */
function detectEnemyOTW(movableTiles, selectedCode, pretendCode, tileName) {
  const { fileName } = parseCode(selectedCode);

  // pawn naver have enemy on vertical tile
  const isPawn = detectPiece(Pawn, selectedCode);
  const filteredMt = isPawn
    ? reject(startsWith(fileName), movableTiles)
    : movableTiles;

  const isEnemy = detectOpponent(selectedCode, pretendCode);
  const isOTW = detectTileOTW(tileName, filteredMt);

  return isOTW && isEnemy;
}

export default curry(detectEnemyOTW);
