import { curry } from 'ramda';

/**
 * Get rankname by index
 * @param  {String} fileName
 * @param  {Number} y
 * @return {Number}
 */
function getRankNameByIndex(rankName, y) {
  return Number(rankName) + y;
}

export default curry(getRankNameByIndex);
