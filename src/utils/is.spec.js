import {
  isEmpty,
  isExist
} from './'

describe('utils/is.js', () => {
  describe('#isEmpty', () => {
    it('Should return false', () => {
      expect(isEmpty('hello world')).toBeFalsy()
      expect(isEmpty(true)).toBeFalsy()
      expect(isEmpty(0)).toBeFalsy()
      expect(isEmpty(function () {})).toBeFalsy()
      expect(isEmpty(null, 'hello world')).toBeFalsy()
    })

    it('Should return true', () => {
      expect(isEmpty(undefined)).toBeTruthy()
      expect(isEmpty(null)).toBeTruthy()
      expect(isEmpty('')).toBeTruthy()
      expect(isEmpty(undefined, null, '', {}, [])).toBeTruthy()
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
