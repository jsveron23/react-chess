import { isEven } from '~/utils'
import { EVEN_TILES, ODD_TILES } from '~/constants'

export const getTilesBy = (rankName) =>
  isEven(rankName) ? EVEN_TILES : ODD_TILES
