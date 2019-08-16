import parseCode from './parseCode'

/**
 * Convert code inside snapshot into tiles
 * @param  {Array} snapshot
 * @return {Array}
 */
function convertSnapshotToTiles (snapshot) {
  return snapshot.map((code) => {
    const { tile } = parseCode(code)

    return tile
  })
}

export default convertSnapshotToTiles
