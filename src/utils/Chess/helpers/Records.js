import * as Utils from '@utils'

const Records = {
  detectTurn (rec = {}) {
    const [isCompletedRec, isRecEmpty, isRecExist] = Utils.pass(
      Records.isCompleteRec,
      Utils.isEmpty,
      Utils.isExist
    )(rec)
    const isWhite = isRecEmpty || (isRecExist && isCompletedRec)

    return isWhite ? 'white' : 'black'
  },

  detectLastTurn (rec = {}) {
    const { black } = rec

    return Utils.isExist(black) ? 'black' : 'white'
  },

  isCompleteRec (rec = {}) {
    return Object.keys(rec).length === 2 // 0, 1 => incomplete
  },

  getMove (fns) {
    const { parseLog } = fns

    return (rec = {}) => (side = 'white') => {
      const { move } = parseLog(rec[side])

      return move || ''
    }
  }
}

export default Records
