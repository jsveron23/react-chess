import { curry } from 'ramda';

/**
 * Get next rank by index
 * @param  {String} fileName
 * @param  {Number} y
 * @return {Number}
 */
function getNextRankByIndex(rankName, y) {
  return Number(rankName) + y;
}

export default curry(getNextRankByIndex);
