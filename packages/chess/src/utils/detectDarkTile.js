import { curry, compose, indexOf, add, not } from 'ramda';
import { Rank, File } from '../presets';

/**
 * Detect which is dark dark (even => `dark`)
 * @param  {String}  fileName
 * @param  {String}  rankName
 * @return {Boolean}
 */
function detectDarkTile(fileName, rankName) {
  if (!fileName || !rankName) {
    throw new TypeError('invalid arguments');
  }

  return not(
    add(
      compose(Math.abs, add(-8), indexOf(rankName))(Rank), // rankIdx
      compose(add(1), indexOf(fileName))(File) // fileIdx
    ) & 1 // bit
  );
}

export default curry(detectDarkTile);
