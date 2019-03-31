import { useSpring } from 'react-spring'
import * as R from 'ramda'
import { isExist } from '~/utils'

/**
 * Animate piece moving by react-spring
 * @param  {Object} animate
 * @param  {String} tile
 * @return {Object}
 */
function useAnimation (animate, tile) {
  const willChange = isExist(animate) && animate.tile === tile
  const props = willChange
    ? {
      from: {
        top: animate.top,
        left: animate.left
      },
      to: {
        top: 0,
        left: 0
      }
    }
    : {}

  return useSpring(props)
}

export default R.curry(useAnimation)
