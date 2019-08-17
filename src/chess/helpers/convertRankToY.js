/**
 * Convert rank to y
 * @param  {String} rank
 * @return {Number}
 */
function convertRankToY (rank) {
  const y = parseInt(rank, 10)

  if (y < 0 || y > 8) {
    return -1
  }

  return y
}

export default convertRankToY
