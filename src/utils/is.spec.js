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

  describe('#isExist', () => {
    it('Should return false', () => {
      expect(isExist('')).toBeFalsy()
      expect(isExist({})).toBeFalsy()
      expect(isExist([])).toBeFalsy()
      expect(isExist({ hello: 'world' }, '')).toBeFalsy()
    })

    it('Should return true', () => {
      expect(isExist(true)).toBeTruthy()
      expect(isExist(0)).toBeTruthy()
      expect(isExist(true, 'hello world', 0)).toBeTruthy()
    })
  })
})
