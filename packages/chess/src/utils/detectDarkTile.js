import { curry } from 'ramda';
import { Rank, File } from '../presets';

/**
 * Sum both index together
 * even number => 'dark'
 * @param  {String}  fileName
 * @param  {String}  rankName
 * @return {Boolean}
 */
function detectDarkTile(fileName, rankName) {
  const rankIdx = Math.abs(Rank.indexOf(rankName) - 8);
  const fileIdx = File.indexOf(fileName) + 1;

  // => (rankIdx + fileIdx) % 2 === 0
  return !((rankIdx + fileIdx) & 1);
}

export default curry(detectDarkTile);
