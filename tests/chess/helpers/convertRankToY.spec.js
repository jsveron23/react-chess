import { convertRankToY } from '~/chess/helper'

describe('#convertRankToY', () => {
  it('convert rank to y', () => {
    expect(convertRankToY('1')).toEqual(1)
    expect(convertRankToY('7')).toEqual(7)
    expect(convertRankToY('9')).toEqual(-1)
  })
})
