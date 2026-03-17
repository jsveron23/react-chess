import { curry, add } from 'ramda';

/**
 * Get next rank by index
 * @param  {String} rankName
 * @param  {Number} y
 * @return {Number}
 */
function getNextRankByIndex(rankName, y) {
  return add(Number(rankName), y);
}

const getNextRankByIndexCurried = curry(getNextRankByIndex);
export { getNextRankByIndexCurried as getNextRankByIndex };