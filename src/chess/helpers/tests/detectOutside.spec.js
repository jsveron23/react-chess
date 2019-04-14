import detectOutside from '../detectOutside'

describe('#detectOutside', () => {
  describe('Detect outside of diagram', () => {
    it('check number', () => {
      expect(detectOutside(1, 0)).toBeTruthy()
      expect(detectOutside(1, 8)).toBeFalsy()
      expect(detectOutside(2, 6)).toBeFalsy()
    })
  })
})
