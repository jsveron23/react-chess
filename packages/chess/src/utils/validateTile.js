import { curry, and } from 'ramda';
import { File, Rank } from '../presets';

/**
 * Validate tile
 * @param  {String}  fileName
 * @param  {Number}  rankName
 * @return {Boolean}
 */
function validateTile(fileName, rankName) {
  return and(File.indexOf(fileName) > -1, Rank.indexOf(rankName) > -1);
}

export default curry(validateTile);
