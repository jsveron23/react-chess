import parseTile from '../parseTile'

describe('#parseTile', () => {
  describe('Divides a tile as single character', () => {
    it('split', () => {
      expect(parseTile('g5')).toEqual({
        file: 'g',
        rank: '5'
      })
    })
  })
})
