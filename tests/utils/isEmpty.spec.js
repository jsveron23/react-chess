import { isEmpty } from '~/utils'

describe('#isEmpty', () => {
  describe('Is value empty?', () => {
    it('Type checking: String', () => {
      expect(isEmpty('')).toBeTruthy()
      expect(isEmpty('{}')).toBeFalsy()
      expect(isEmpty('[]')).toBeFalsy()
      expect(isEmpty('false')).toBeFalsy()
    })

    it('Type checking: Number', () => {
      expect(isEmpty(-1)).toBeFalsy()
      expect(isEmpty(0)).toBeFalsy()
      expect(isEmpty(1)).toBeFalsy()
      expect(isEmpty(NaN)).toBeFalsy()
      expect(isEmpty(Infinity)).toBeFalsy()
    })

    it('Type checking: Array', () => {
      expect(isEmpty([false])).toBeFalsy()
      expect(isEmpty([])).toBeTruthy()
      expect(isEmpty([{}])).toBeFalsy()
    })

    it('Type checking: Object', () => {
      expect(isEmpty({ hello: 'world' })).toBeFalsy()
      expect(isEmpty({})).toBeTruthy()
    })

    it('Type checking: Function', () => {
      expect(isEmpty(function () {})).toBeFalsy()
      expect(isEmpty(() => {})).toBeFalsy()
    })

    it('Type checking: Symbol', () => {
      expect(isEmpty(Symbol(''))).toBeFalsy()
      expect(isEmpty(Symbol(false))).toBeFalsy()
    })

    it('Type checking: undefined, null', () => {
      expect(isEmpty(undefined)).toBeTruthy()
      expect(isEmpty(null)).toBeTruthy()
    })

    it('Multiple arguments', () => {
      expect(isEmpty.and('', { 0: false }, [0], function () {})).toBeFalsy()
      expect(isEmpty.or('', { 0: false }, [0], function () {})).toBeTruthy()
    })

    it('Lazy return', () => {
      expect(isEmpty.lazy('')()).toBeTruthy()
      expect(isEmpty.lazy({ hello: 'world' })()).toBeFalsy()
    })
  })
})
