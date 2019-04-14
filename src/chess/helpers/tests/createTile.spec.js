import createTile from '../createTile'

describe('#createTile', () => {
  describe('Create tile', () => {
    it('combine 2 strings', () => {
      expect(createTile('b', '7')).toEqual('b7')
      expect(createTile('c', '2')).toEqual('c2')
      expect(createTile('', '2')).toEqual('')
      expect(createTile('h', '')).toEqual('')
    })
  })
})
