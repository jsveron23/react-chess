import convertFileToX from '../convertFileToX'

describe('#convertFileToX', () => {
  describe('Convert file to axis x', () => {
    it('string -> number', () => {
      expect(convertFileToX('a')).toEqual(1)
      expect(convertFileToX('d')).toEqual(4)
    })

    it('invalid file', () => {
      expect(convertFileToX('z')).toEqual(-1)
    })
  })
})
