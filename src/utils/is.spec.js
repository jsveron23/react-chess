import {
  isEmpty,
  isExist
} from './'

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
      expect(isEmpty('false', { 0: false }, [0], function () {})).toBeFalsy()
    })

    it('#isExist', () => {
      expect(isExist(0, false, {}, [])).toBeFalsy()
    })
  })
})
