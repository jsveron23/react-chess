import { decide } from '~/utils'

describe('#decide', () => {
  describe('decide which function will use by condition then using argument to function', () => {
    it('it will uses proper function based by callback return', () => {
      const fns = [(a) => a + 1, (b) => b + 2]
      const args = [2, 4]
      const awaitDecide = decide(fns, args)

      expect(awaitDecide((a, b) => a < b)).toEqual(3)
      expect(awaitDecide((a, b) => a > b)).toEqual(4)
      expect(awaitDecide((a, b) => a === b)).toEqual(4)
      expect(awaitDecide([])).toEqual(3)
    })

    it('callback function is not given', () => {
      const fns = [(a) => a + 1, (b) => b + 2]
      const args = [2, 4]
      const awaitDecide = decide(fns, args)

      expect(awaitDecide([])).toEqual(3)
    })

    it('length is not same', () => {
      const mockFn = jest.fn

      expect(() => decide([mockFn()], [1, 2], mockFn())).toThrow()
      expect(() => decide([mockFn(), mockFn()], [2], mockFn())).toThrow()
    })
  })
})
