import {
  isEmpty,
  isExist,
  isString,
  isNumber,
  isArray,
  isObject,
  isFunction,
  isEven
} from '../../src/utils/is'

describe('utils/is.js', () => {
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

  describe('#isString', () => {
    it('Mulitple arguments also alowed', () => {
      expect(isString('')).toBeTruthy()
      expect(isString(``)).toBeTruthy()
      expect(isString([])).toBeFalsy()
      expect(isString({})).toBeFalsy()
      expect(isString(function () {})).toBeFalsy()
      expect(isString(0)).toBeFalsy()
      expect(isString(NaN)).toBeFalsy()
      expect(isString(Infinity)).toBeFalsy()
      expect(isString(null)).toBeFalsy()
      expect(isString(undefined)).toBeFalsy()
      expect(isString('', ``)).toBeTruthy()
    })
  })

  describe('#isNumber', () => {
    it('Mulitple arguments also alowed', () => {
      expect(isNumber('')).toBeFalsy()
      expect(isNumber(``)).toBeFalsy()
      expect(isNumber([])).toBeFalsy()
      expect(isNumber({})).toBeFalsy()
      expect(isNumber(function () {})).toBeFalsy()
      expect(isNumber(0)).toBeTruthy()
      expect(isNumber(NaN)).toBeTruthy()
      expect(isNumber(Infinity)).toBeTruthy()
      expect(isNumber(null)).toBeFalsy()
      expect(isNumber(undefined)).toBeFalsy()
      expect(isNumber(-1, 0, 1)).toBeTruthy()
    })
  })

  describe('#isArray', () => {
    it('Mulitple arguments also alowed', () => {
      expect(isArray('')).toBeFalsy()
      expect(isArray(``)).toBeFalsy()
      expect(isArray([])).toBeTruthy()
      expect(isArray({})).toBeFalsy()
      expect(isArray(function () {})).toBeFalsy()
      expect(isArray(0)).toBeFalsy()
      expect(isArray(NaN)).toBeFalsy()
      expect(isArray(Infinity)).toBeFalsy()
      expect(isArray(null)).toBeFalsy()
      expect(isArray(undefined)).toBeFalsy()
      expect(isArray([], [-1], [''], [{}])).toBeTruthy()
    })
  })

  describe('#isObject', () => {
    it('Mulitple arguments also alowed', () => {
      expect(isObject('')).toBeFalsy()
      expect(isObject(``)).toBeFalsy()
      expect(isObject([])).toBeFalsy()
      expect(isObject({})).toBeTruthy()
      expect(isObject(function () {})).toBeFalsy()
      expect(isObject(0)).toBeFalsy()
      expect(isObject(NaN)).toBeFalsy()
      expect(isObject(Infinity)).toBeFalsy()
      expect(isObject(null)).toBeFalsy()
      expect(isObject(undefined)).toBeFalsy()
      expect(isObject({}, { a: [-1] }, Object())).toBeTruthy()
    })
  })

  describe('#isFunction', () => {
    it('Mulitple arguments also alowed', () => {
      expect(isFunction('')).toBeFalsy()
      expect(isFunction(``)).toBeFalsy()
      expect(isFunction([])).toBeFalsy()
      expect(isFunction({})).toBeFalsy()
      expect(isFunction(function () {})).toBeTruthy()
      expect(isFunction(0)).toBeFalsy()
      expect(isFunction(null)).toBeFalsy()
      expect(isFunction(undefined)).toBeFalsy()
      expect(isFunction(NaN)).toBeFalsy()
      expect(isFunction(Infinity)).toBeFalsy()
      expect(isFunction(function () {}, () => {})).toBeTruthy()
    })
  })

  describe('#isEven', () => {
    it('Is even?', () => {
      expect(isEven(10)).toBeTruthy()
      expect(isEven(13)).toBeFalsy()
    })
  })
})
