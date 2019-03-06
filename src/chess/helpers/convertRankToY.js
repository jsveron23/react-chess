/**
 * Convert rank to y
 * @param  {String} rank
 * @return {Number}
 */
function convertRankToY (rank) {
  const y = parseInt(rank, 10)

  if (y >= 9 || y < 0) {
    return -1
  }

  return y
}

export default convertRankToY
