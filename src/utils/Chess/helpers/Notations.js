import * as Utils from '@utils'

const Notations = {
  isValid (reg) {
    return (notation) => reg.test(notation)
  },

  has (notations) {
    const findOne = Utils.findOne(notations)

    return (position) => Utils.isExist(findOne(position))
  },

  revert (notations) {
    const update = Utils.update(notations)

    return (before) => (after) => update(after)(before)
  }
}

export default Notations
