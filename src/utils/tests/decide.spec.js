import decide from '../decide'

describe('#decide (compose)', () => {
  describe('Callback returns boolean that decide which function will use', () => {
    const add = (a, b) => a + b
    const minus = (a, b) => a - b

    const fns = [add, minus]
    const args = [2, 4]

    const awaitDecide = decide(fns, args)

    it('if callback return true', () => {
      expect(awaitDecide((a, b) => a < b)).toEqual(add(...args))
    })

    it('if callback return false ', () => {
      expect(awaitDecide((a, b) => a > b)).toEqual(minus(...args))
    })

    it('invalid callback', () => {
      expect(() => awaitDecide([])).toThrow()
      expect(() => awaitDecide(0)).toThrow()
    })

    it('callback return not boolean type', () => {
      expect(() => awaitDecide(() => {})).toThrow()
    })

    it('not same length', () => {
      const mockFn = jest.fn

      expect(() => decide([mockFn()], [1, 2], mockFn())).toThrow()
      expect(() => decide([mockFn(), mockFn()], [2], mockFn())).toThrow()
    })
  })
})
