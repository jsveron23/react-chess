import { curry } from 'ramda';
import { Rank, File } from '../presets';

/**
 * Sum both index together
 * even number => 'dark'
 * @param  {String}  rankName
 * @param  {String}  fileName
 * @return {Boolean}
 */
function detectDarkTile(rankName, fileName) {
  const rankIdx = Math.abs(Rank.indexOf(rankName) - 8);
  const fileIdx = File.indexOf(fileName) + 1;

  // => (rankIdx + fileIdx) % 2 === 0
  return !((rankIdx + fileIdx) & 1);
}

export default curry(detectDarkTile);