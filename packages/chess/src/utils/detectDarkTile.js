import { curry, compose, indexOf, subtract, not, add } from 'ramda';
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

  const rankIdx = compose(Math.abs, subtract(8), indexOf(rankName))(Rank);
  const fileIdx = compose(add(1), indexOf(fileName))(File);

  return not(add(rankIdx, fileIdx) & 1); // bit
}

export default curry(detectDarkTile);
