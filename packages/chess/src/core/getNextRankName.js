import { curry } from 'ramda';

function getNextRankName(rankName, y) {
  return Number(rankName) + y;
}

export default curry(getNextRankName);
