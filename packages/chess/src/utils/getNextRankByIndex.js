import { curry, add } from 'ramda';

/**
 * Get next rank by index
 * @param  {String} fileName
 * @param  {Number} y
 * @return {Number}
 */
function getNextRankByIndex(rankName, y) {
  return add(rankName, y);
}

export default curry(getNextRankByIndex);
