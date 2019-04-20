import parseTile from '../parseTile'

describe('#parseTile', () => {
  describe('Split a tile', () => {
    it('normal use case', () => {
      const parsedTile = parseTile('g5')

      expect(parsedTile).toHaveProperty('file', 'g')
      expect(parsedTile).toHaveProperty('rank', '5')
    })
  })
})
