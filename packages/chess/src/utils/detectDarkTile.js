import { curry } from 'ramda';
import { Rank, File } from '../presets';

/**
 * Detect which is dark dark (even => `dark`)
 * @param  {String}  fileName
 * @param  {String}  rankName
 * @return {Boolean}
 */
function detectDarkTile(fileName, rankName) {
  if (!fileName || !rankName) {
    throw new TypeError(`invalid arguments`);
  }

  const rankIdx = Math.abs(Rank.indexOf(rankName) - 8);
  const fileIdx = File.indexOf(fileName) + 1;
  const isOdd = (rankIdx + fileIdx) & 1; // bit

  return !isOdd;
}

export default curry(detectDarkTile);
