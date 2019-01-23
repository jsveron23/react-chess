import PIECE_MAP from '~/components/pieceMap'
import enhancePiece from '~/components/enhancePiece'

function getPiece (map) {
  const enhancedMap = Object.keys(map).reduce((acc, key) => {
    const Component = map[key]

    return {
      ...acc,
      [key]: enhancePiece(Component, key)
    }
  }, {})

  return ({ color, piece }) => enhancedMap[`${color}${piece}`]
}

export default getPiece(PIECE_MAP)
