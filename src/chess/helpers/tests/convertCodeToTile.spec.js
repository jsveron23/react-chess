import convertCodeToTile from '../convertCodeToTile'

describe('#convertCodeToTile', () => {
  describe('Convert code to tile', () => {
    it('single code -> single tile', () => {
      expect(convertCodeToTile('bPb7')).toEqual('b7')
      expect(convertCodeToTile('wBc1')).toEqual('c1')
    })

    it('given invalid code', () => {
      expect(() => convertCodeToTile('Pb7')).toThrow()
      expect(() => convertCodeToTile(0)).toThrow()
      expect(() => convertCodeToTile([])).toThrow()
    })
  })
})
