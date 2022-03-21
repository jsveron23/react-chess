import { Rank, File } from '../chess';

/**
 * Sum both index together
 * even number => 'dark'
 * @param  {String}  rankName
 * @param  {String}  fileName
 * @return {Boolean}
 */
export default function IsSumEven({ rankName, fileName }) {
  const rankIdx = Math.abs(Rank.indexOf(rankName) - 8);
  const fileIdx = File.indexOf(fileName) + 1;

  return (rankIdx + fileIdx) % 2 === 0;
}
