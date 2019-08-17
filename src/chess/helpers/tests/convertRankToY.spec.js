import convertRankToY from '../convertRankToY'

describe('#convertRankToY', () => {
  it('Convert rank to y', () => {
    expect(convertRankToY('1')).toEqual(1)
    expect(convertRankToY('7')).toEqual(7)
    expect(convertRankToY('9')).toEqual(-1)
  })
})
