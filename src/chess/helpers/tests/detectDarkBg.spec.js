import detectDarkBg from '../detectDarkBg'

describe('#detectDarkBg', () => {
  describe('Is dark background?', () => {
    it('is even?', () => {
      expect(detectDarkBg('b2')).toBeTruthy()
      expect(detectDarkBg('d1')).toBeFalsy()
    })
  })
})
