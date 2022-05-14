import { curry, reject, startsWith, endsWith } from 'ramda';
import parseCode from './parseCode';
import { Vertical, Horizontal } from '../presets';

/**
 * Remove direction inside code
 * @param  {String} directionName
 * @param  {Array}  movableTiles
 * @param  {String} code
 * @return {Array}
 */
function removeDirection(directionName, movableTiles, code) {
  const { fileName, rankName } = parseCode(code);
  // TODO support `Diagonal`
  const map = {
    [Vertical]: startsWith(fileName),
    [Horizontal]: endsWith(rankName),
  };

  return reject(map[directionName], movableTiles);
}

export default curry(removeDirection);
