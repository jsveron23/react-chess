import detectOpponentByCode from '../detectOpponentByCode'

describe('#detectOpponentByCode', () => {
  describe('Detect opponent code check', () => {
    it('check opponent code', () => {
      expect(detectOpponentByCode('w', 'bBc8')).toBeTruthy()
      expect(detectOpponentByCode('b', 'bBc8')).toBeFalsy()
    })
  })
})
