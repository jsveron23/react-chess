import { curry, reject, startsWith } from 'ramda';
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
    [Vertical]: fileName,
    [Horizontal]: rankName,
  };

  return reject(startsWith(map[directionName]), movableTiles);
}

export default curry(removeDirection);
