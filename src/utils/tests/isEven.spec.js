import isEven from '../isEven'

describe('#isEven', () => {
  describe('Detection of even number', () => {
    it('normal use case', () => {
      expect(isEven(10)).toBeTruthy()
      expect(isEven(13)).toBeFalsy()
    })

    it('only number is allowed', () => {
      expect(() => isEven('a')).toThrow()
      expect(() => isEven([])).toThrow()
    })
  })
})
