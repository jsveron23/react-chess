import convertRankToY from '../convertRankToY'

describe('#convertRankToY', () => {
  describe('Convert rank to axis y', () => {
    it('string -> number', () => {
      expect(convertRankToY('1')).toEqual(1)
      expect(convertRankToY('7')).toEqual(7)
    })

    it('given invalid rank', () => {
      expect(convertRankToY('9')).toEqual(-1)
    })
  })
})
