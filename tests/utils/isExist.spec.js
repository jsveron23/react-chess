import { isExist } from '~/utils'

describe('#isExist', () => {
  describe('check exist value and multiple arguments', () => {
    it('Type checking: String', () => {
      expect(isExist('')).toBeFalsy()
      expect(isExist('{}')).toBeTruthy()
      expect(isExist('[]')).toBeTruthy()
      expect(isExist('false')).toBeTruthy()
    })

    it('Type checking: Number', () => {
      expect(isExist(-1)).toBeTruthy()
      expect(isExist(0)).toBeTruthy()
      expect(isExist(1)).toBeTruthy()
      expect(isExist(NaN)).toBeTruthy()
      expect(isExist(Infinity)).toBeTruthy()
      expect(isExist.or(-1)).toBeTruthy()
      expect(isExist.or(0)).toBeTruthy()
      expect(isExist.or(1)).toBeTruthy()
      expect(isExist.or(NaN)).toBeTruthy()
      expect(isExist.or(Infinity)).toBeTruthy()
    })

    it('Type checking: Array', () => {
      expect(isExist([false])).toBeTruthy()
      expect(isExist([])).toBeFalsy()
      expect(isExist({})).toBeFalsy()
      expect(isExist([{}])).toBeTruthy()
    })

    it('Type checking: Object', () => {
      expect(isExist({ hello: 'world' })).toBeTruthy()
      expect(isExist({})).toBeFalsy()
    })

    it('Type checking: Function', () => {
      expect(isExist(function () {})).toBeTruthy()
      expect(isExist(() => {})).toBeTruthy()
      expect(isExist.or(function () {})).toBeTruthy()
      expect(isExist.or(() => {})).toBeTruthy()
    })

    it('Type checking: Symbol', () => {
      expect(isExist(Symbol(''))).toBeTruthy()
      expect(isExist(Symbol(false))).toBeTruthy()
      expect(isExist.or(Symbol(''))).toBeTruthy()
      expect(isExist.or(Symbol(false))).toBeTruthy()
    })

    it('Type checking: undefined, null', () => {
      expect(isExist(undefined)).toBeFalsy()
      expect(isExist(null)).toBeFalsy()
    })

    it('Multiple arguments', () => {
      expect(isExist.and(null, undefined, '', {}, [])).toBeFalsy()
      expect(isExist.or(null, undefined, 'sdfds', {}, [])).toBeTruthy()
    })
  })
})
