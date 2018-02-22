import * as Utils from '@utils'

const Parser = {
  move (move) {
    const [before, after] = move.split(/\s|x/)

    return {
      before,
      after
    }
  },

  position (position, isStream = false) {
    const [file, rank] = position.split('')

    return isStream
      ? [file, rank]
      : { file, rank }
  },

  notation (fns) {
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

export default Parser
