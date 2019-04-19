import * as R from 'ramda'
import parseCode from './parseCode'

/**
 * Get remain their side code list only
 * @param  {String} side
 * @param  {Array}  snapshot
 * @return {Array}
 */
function getOneSidedCodeList (side, snapshot) {
  return snapshot.reduce((acc, code) => {
    const parsedCode = parseCode(code)

    if (parsedCode.side === side) {
      return [...acc, code]
    }

    return acc
  }, [])
}

export default R.curry(getOneSidedCodeList)
