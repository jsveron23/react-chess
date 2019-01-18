import { isEmpty, isExist, isArray, isObject } from '../src/utils/is'

describe('utils/is.js', () => {
  describe('#isEmpty: Type test', () => {
    it('String', () => {
      expect(isEmpty('false')).toBeFalsy()
      expect(isEmpty('')).toBeTruthy()
    })

    it('Number', () => {
      expect(isEmpty(0)).toBeFalsy()
      expect(isEmpty(1)).toBeFalsy()
      expect(isEmpty(NaN)).toBeTruthy()
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
      expect(isExist(NaN)).toBeFalsy()
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

  describe('#isArray', () => {
    it('Mulitple arguments also alowed', () => {
      expect(isArray([])).toBeTruthy()
      expect(isArray({})).toBeFalsy()
      expect(isArray(function () {})).toBeFalsy()
      expect(isArray(0)).toBeFalsy()
      expect(isArray(null)).toBeFalsy()
      expect(isArray(undefined)).toBeFalsy()
      expect(isArray(NaN)).toBeFalsy()
      expect(isArray([], [-1], [''], [{}])).toBeTruthy()
    })
  })

  describe('#isObject', () => {
    it('Mulitple arguments also alowed', () => {
      expect(isObject([])).toBeFalsy()
      expect(isObject({})).toBeTruthy()
      expect(isObject(function () {})).toBeFalsy()
      expect(isObject(0)).toBeFalsy()
      expect(isObject(null)).toBeFalsy()
      expect(isObject(undefined)).toBeFalsy()
      expect(isObject(NaN)).toBeFalsy()
      expect(isObject({}, { a: [-1] }, Object())).toBeTruthy()
    })
  })
})
