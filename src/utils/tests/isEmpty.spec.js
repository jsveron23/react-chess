import isEmpty from '../isEmpty'

describe('#isEmpty', () => {
  describe('Is value empty?', () => {
    it('string', () => {
      expect(isEmpty('')).toBeTruthy()
      expect(isEmpty('{}')).toBeFalsy()
      expect(isEmpty('[]')).toBeFalsy()
      expect(isEmpty('false')).toBeFalsy()
    })

    it('number', () => {
      expect(isEmpty(-1)).toBeFalsy()
      expect(isEmpty(0)).toBeFalsy()
      expect(isEmpty(1)).toBeFalsy()
      expect(isEmpty(NaN)).toBeFalsy()
      expect(isEmpty(Infinity)).toBeFalsy()
    })

    it('array', () => {
      expect(isEmpty([false])).toBeFalsy()
      expect(isEmpty([])).toBeTruthy()
      expect(isEmpty([{}])).toBeFalsy()
    })

    it('object', () => {
      expect(isEmpty({ hello: 'world' })).toBeFalsy()
      expect(isEmpty({})).toBeTruthy()
    })

    it('function', () => {
      expect(isEmpty(function () {})).toBeFalsy()
      expect(isEmpty(() => {})).toBeFalsy()
    })

    it('symbol', () => {
      expect(isEmpty(Symbol(''))).toBeFalsy()
      expect(isEmpty(Symbol(false))).toBeFalsy()
    })

    it('undefined, null', () => {
      expect(isEmpty(undefined)).toBeTruthy()
      expect(isEmpty(null)).toBeTruthy()
    })

    it('multiple arguments', () => {
      expect(isEmpty.and('', { 0: false }, [0], function () {})).toBeFalsy()
      expect(isEmpty.or('', { 0: false }, [0], function () {})).toBeTruthy()
    })

    it('lazy return', () => {
      expect(isEmpty.lazy('')()).toBeTruthy()
      expect(isEmpty.lazy({ hello: 'world' })()).toBeFalsy()
    })
  })
})
