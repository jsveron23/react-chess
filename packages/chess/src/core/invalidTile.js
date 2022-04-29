function invalidTile(fileName, rankName) {
  const invalidFileIdx = !fileName;
  const invalidRankIdx = rankName <= 0;

  return invalidFileIdx || invalidRankIdx;
}

export default invalidTile;
