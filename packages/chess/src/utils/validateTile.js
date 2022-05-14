import { curry } from 'ramda';
import { File, Rank } from '../presets';

/**
 * Validate tile
 * @param  {String}  fileName
 * @param  {String}  rankName
 * @return {Boolean}
 */
function validateTile(fileName, rankName) {
  return File.indexOf(fileName) > -1 && Rank.indexOf(Number(rankName)) > -1;
}

export default curry(validateTile);
