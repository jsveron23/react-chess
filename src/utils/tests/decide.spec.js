import { decide } from '~/utils'

describe('#decide', () => {
  describe('Callback returns boolean that decide which function will use which argument', () => {
    test('2 functions, 2 args', () => {
      const fns = [(a) => a + 1, (b) => b + 2]
      const args = [2, 4]
      const awaitDecide = decide(fns, args)

      expect(awaitDecide((a, b) => a < b)).toEqual(3)
      expect(awaitDecide((a, b) => a > b)).toEqual(4)
      expect(awaitDecide((a, b) => a === b)).toEqual(4)
    })

    test('callback is not given properly', () => {
      const fns = [(a) => a + 1, (b) => b + 2]
      const args = [2, 4]
      const awaitDecide = decide(fns, args)

      expect(awaitDecide([])).toEqual(3)
      expect(awaitDecide(0)).toEqual(3)
      expect(() => awaitDecide(() => {})).toThrow()
    })

    test('length is not same', () => {
      const mockFn = jest.fn

      expect(() => decide([mockFn()], [1, 2], mockFn())).toThrow()
      expect(() => decide([mockFn(), mockFn()], [2], mockFn())).toThrow()
    })
  })
})
