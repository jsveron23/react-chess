import memoize from 'memoize-one'
import getPiece from '~/chess/getPiece'

export default memoize(getPiece)
