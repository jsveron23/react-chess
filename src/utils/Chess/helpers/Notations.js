import * as Utils from '@utils'
import { REG_NOTATION } from '@constants'

const Notations = {
  isValid (notation, reg = REG_NOTATION) {
    return reg.test(notation)
  },

  has (notations) {
    const findOne = Utils.findOne(notations)

    return (position) => Utils.isExist(findOne(position))
  },

  revert (notations) {
    const update = Utils.update(notations)

    return (before, after) => update(after, before)
  },

  parse (fns) {
    const { getSide } = fns

    return (notation, isStream = false) => {
      if (Utils.isEmpty(notation)) {
        return {}
      }

      const [alias, piece, ...position] = notation.split('')
      const side = getSide(alias)

      return isStream
        ? [piece, position.join(''), side]
        : {
          position: position.join(''),
          side,
          piece
        }
    }
  }
}

export default Notations
