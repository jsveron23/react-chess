import isInvalidKey from '../isInvalidKey'

describe('#isInvalidKey', () => {
  describe('Is invalid object key?', () => {
    it('only string and number allow', () => {
      expect(isInvalidKey(12321)).toBeFalsy()
      expect(isInvalidKey('13')).toBeFalsy()
    })

    it('another types are ok but hard to trace', () => {
      expect(isInvalidKey(function () {})).toBeTruthy()
      expect(isInvalidKey([])).toBeTruthy()
    })
  })
})
