import { isEmpty } from '~/utils'

/**
 * Create text
 * @param  {...String} [...args]
 * @return {String}
 */
function createTxt (...args) {
  if (isEmpty.or(...args)) {
    return ''
  }

  return ''.concat(...args)
}

export default createTxt
