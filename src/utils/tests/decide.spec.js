import decide from '../decide'

describe('#decide', () => {
  describe('Callback returns boolean that decide which function will use one of argument', () => {
    const fns = [(a) => a + 1, (b) => b + 2]
    const args = [2, 4]
    const awaitDecide = decide(fns, args)

    it('2 functions, 2 args', () => {
      expect(awaitDecide((a, b) => a < b)).toEqual(3)
      expect(awaitDecide((a, b) => a > b)).toEqual(4)
      expect(awaitDecide((a, b) => a === b)).toEqual(4)
    })

    it('callback is not given or not return boolean', () => {
      expect(() => awaitDecide([])).toThrow()
      expect(() => awaitDecide(0)).toThrow()
      expect(() => awaitDecide(() => {})).toThrow()
    })

    it('length is not same', () => {
      const mockFn = jest.fn

      expect(() => decide([mockFn()], [1, 2], mockFn())).toThrow()
      expect(() => decide([mockFn(), mockFn()], [2], mockFn())).toThrow()
    })
  })
})
