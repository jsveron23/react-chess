import createTile from '../createTile'

describe('#createTile', () => {
  describe('Create tile', () => {
    it('combine 2 strings', () => {
      expect(createTile('b', '7')).toEqual('b7')
      expect(createTile('c', '2')).toEqual('c2')
    })

    it('it will not work with empty string', () => {
      expect(() => createTile('', '2')).toThrow()
      expect(() => createTile('h', '')).toThrow()
    })
  })
})
