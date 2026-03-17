import { curry, reject, startsWith, endsWith } from 'ramda';
import { parseCode } from './parse-code';
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
  const directionMap = {
    [Vertical]: startsWith(fileName),
    [Horizontal]: endsWith(rankName),
  };

  return reject(directionMap[directionName], movableTiles);
}

const _removeDirection = curry(removeDirection);

_removeDirection.Vertical = _removeDirection(Vertical);
_removeDirection.Horizontal = _removeDirection(Horizontal);

export { _removeDirection as removeDirection };