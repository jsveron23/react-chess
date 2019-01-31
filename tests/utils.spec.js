import { extract, trace, isEmpty, isExist, isEven } from '../src/utils'

describe('utils', () => {
  describe('#isEmpty: Type test', () => {
    it('String', () => {
      expect(isEmpty('false')).toBeFalsy()
      expect(isEmpty('')).toBeTruthy()
    })

    it('Number', () => {
      expect(isEmpty(0)).toBeFalsy()
      expect(isEmpty(1)).toBeFalsy()
      expect(isEmpty(NaN)).toBeFalsy()
      expect(isEmpty(Infinity)).toBeFalsy()
    })

    it('Array', () => {
      expect(isEmpty([false])).toBeFalsy()
      expect(isEmpty([])).toBeTruthy()
    })

    it('Object', () => {
      expect(isEmpty('hello world')).toBeFalsy()
      expect(isEmpty('')).toBeTruthy()
    })

    it('Function', () => {
      expect(isEmpty(function () {})).toBeFalsy()
      expect(isEmpty(() => {})).toBeFalsy()
    })

    it('Symbol', () => {
      expect(isEmpty(Symbol(''))).toBeFalsy()
      expect(isEmpty(Symbol(false))).toBeFalsy()
    })

    it('undefined, null', () => {
      expect(isEmpty(undefined)).toBeTruthy()
      expect(isEmpty(null)).toBeTruthy()
    })
  })

  describe('#isExist: Type test', () => {
    it('String', () => {
      expect(isExist('false')).toBeTruthy()
      expect(isExist('')).toBeFalsy()
    })

    it('Number', () => {
      expect(isExist(0)).toBeTruthy()
      expect(isExist(1)).toBeTruthy()
      expect(isExist(NaN)).toBeTruthy()
      expect(isExist(Infinity)).toBeTruthy()
    })

    it('Array', () => {
      expect(isExist([false])).toBeTruthy()
      expect(isExist([])).toBeFalsy()
    })

    it('Object', () => {
      expect(isExist('hello world')).toBeTruthy()
      expect(isExist('')).toBeFalsy()
    })

    it('Function', () => {
      expect(isExist(function () {})).toBeTruthy()
      expect(isExist(() => {})).toBeTruthy()
    })

    it('Symbol', () => {
      expect(isExist(Symbol(''))).toBeTruthy()
      expect(isExist(Symbol(false))).toBeTruthy()
    })

    it('undefined, null', () => {
      expect(isExist(undefined)).toBeFalsy()
      expect(isExist(null)).toBeFalsy()
    })
  })

  describe('Multiple arguments test', () => {
    it('#isEmpty', () => {
      expect(isEmpty('', { 0: false }, [0], function () {})).toBeFalsy()
      expect(isEmpty.or('', { 0: false }, [0], function () {})).toBeTruthy()
    })

    it('#isExist', () => {
      expect(isExist(null, undefined, '', {}, [])).toBeFalsy()
      expect(isExist.or(null, undefined, 'sdfds', {}, [])).toBeTruthy()
    })
  })

  describe('#isEven', () => {
    it('Is even?', () => {
      expect(isEven(10)).toBeTruthy()
      expect(isEven(13)).toBeFalsy()
    })
  })

  describe('#extract', () => {
    it('Extract value from onject', () => {
      expect(extract('a')({ a: 1, b: 2, c: 3 })).toEqual(1)
      expect(extract('c')({ a: 1, b: 2, c: 3 })).toEqual(3)
    })
  })

  describe('#trace', () => {
    it('Trace log while composing', () => {
      const v = {}

      expect(trace('trace')(v)).toEqual(v)
    })
  })
})
