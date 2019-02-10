import { curry, includes } from 'ramda'

/**
 * Replace lineup items of lineup
 * @param  {string} replace
 * @param  {string} textToken
 * @param  {Array}  lineup
 * @return {Array}
 */
function replaceLineup (replace, textToken, lineup) {
  return lineup.map((lineupItem) => {
    if (includes(textToken, lineupItem)) {
      return replace
    }

    return lineupItem
  })
}

export default curry(replaceLineup)
