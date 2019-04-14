import convertTileToAxis from '../convertTileToAxis'

describe('#convertTileToAxis', () => {
  describe('Convert file, rank to axis x, y', () => {
    it('string -> object', () => {
      expect(convertTileToAxis('a7')).toEqual({
        x: 1,
        y: 7
      })
      expect(convertTileToAxis('h2')).toEqual({
        x: 8,
        y: 2
      })
    })
  })
})
