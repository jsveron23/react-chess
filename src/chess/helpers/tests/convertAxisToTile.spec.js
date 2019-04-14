import convertAxisToTile from '../convertAxisToTile'

describe('#convertAxisToTile', () => {
  describe('Convert axis to tile', () => {
    it('single axis -> single tile', () => {
      expect(convertAxisToTile([4, 3])).toEqual('d3')
      expect(convertAxisToTile([4, -3])).toEqual('')
    })
  })
})
