import { split } from 'ramda'

/**
 * Parse single item of snapshot
 * @param  {string} snapshotItem
 * @return {Object}
 */
function parseSnapshotItem (snapshotItem) {
  const [side, piece, file, rank] = split('', snapshotItem)

  return { side, piece, file, rank }
}

export default parseSnapshotItem
