import isExist from '../isExist'

describe('#isExist', () => {
  describe('Is value exist?', () => {
    it('string', () => {
      expect(isExist('')).toBeFalsy()
      expect(isExist('{}')).toBeTruthy()
      expect(isExist('[]')).toBeTruthy()
      expect(isExist('false')).toBeTruthy()
    })

    it('number', () => {
      expect(isExist(-1)).toBeTruthy()
      expect(isExist(0)).toBeTruthy()
      expect(isExist(1)).toBeTruthy()
      expect(isExist(NaN)).toBeTruthy()
      expect(isExist(Infinity)).toBeTruthy()
    })

    it('array', () => {
      expect(isExist([false])).toBeTruthy()
      expect(isExist([])).toBeFalsy()
      expect(isExist({})).toBeFalsy()
      expect(isExist([{}])).toBeTruthy()
    })

    it('object', () => {
      expect(isExist({ hello: 'world' })).toBeTruthy()
      expect(isExist({})).toBeFalsy()
    })

    it('function', () => {
      expect(isExist(function () {})).toBeTruthy()
      expect(isExist(() => {})).toBeTruthy()
    })

    it('symbol', () => {
      expect(isExist(Symbol(''))).toBeTruthy()
      expect(isExist(Symbol(false))).toBeTruthy()
    })

    it('undefined, null', () => {
      expect(isExist(undefined)).toBeFalsy()
      expect(isExist(null)).toBeFalsy()
    })

    it('multiple arguments', () => {
      expect(isExist.and(null, undefined, '', {}, [])).toBeFalsy()
      expect(isExist.or(null, undefined, 'sdfds', {}, [])).toBeTruthy()
    })

    it('lazy return', () => {
      expect(isExist.lazy('')()).toBeFalsy()
      expect(isExist.lazy({ hello: 'world' })()).toBeTruthy()
    })
  })
})
