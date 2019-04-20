import * as R from 'ramda'
import parseCode from './parseCode'

/**
 * Remain given side code of snapshot
 * @param  {String} side
 * @param  {Array}  snapshot
 * @return {Array}
 */
function reduceSnapshotBySide (side, snapshot) {
  return snapshot.reduce((acc, code) => {
    const parsedCode = parseCode(code)

    if (parsedCode.side !== side) {
      return acc
    }

    return [...acc, code]
  }, [])
}

export default R.curry(reduceSnapshotBySide)
