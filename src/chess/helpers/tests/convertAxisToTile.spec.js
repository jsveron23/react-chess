import convertAxisToTile from '../convertAxisToTile'

describe('#convertAxisToTile', () => {
  describe('Convert single axis to single tile', () => {
    it('normal use case', () => {
      expect(convertAxisToTile([4, 3])).toEqual('d3')
      expect(convertAxisToTile([4, -3])).toEqual('')
    })
  })
})
