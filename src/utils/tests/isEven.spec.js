import isEven from '../isEven'

describe('#isEven', () => {
  describe('Is even number?', () => {
    it('even number check', () => {
      expect(isEven(10)).toBeTruthy()
      expect(isEven(13)).toBeFalsy()
    })

    it('accept only number', () => {
      expect(() => isEven('a')).toThrow()
      expect(() => isEven([])).toThrow()
    })
  })
})
