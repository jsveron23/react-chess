import { curry, reject, startsWith, endsWith, prop } from 'ramda';
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
  return reject(
    prop(directionName, {
      [Vertical]: startsWith(fileName),
      [Horizontal]: endsWith(rankName),
    }),
    movableTiles
  );
}

const _removeDirection = curry(removeDirection);

_removeDirection.Vertical = _removeDirection(Vertical);

export default _removeDirection;
