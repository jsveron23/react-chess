/**
 * Transform rank name as number
 * @param  {string} rankName
 * @return {number}
 */
function transformRank (rankName) {
  return parseInt(rankName, 10)
}

export default transformRank
