import { isEmpty } from '~/utils'

/**
 * Merge text
 * @param  {...String} [...args]
 * @return {String}
 */
function _mergeTxt (...args) {
  if (isEmpty.or(...args)) {
    return ''
  }

  return ''.concat(...args)
}

export default _mergeTxt
