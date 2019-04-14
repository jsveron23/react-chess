import decrease from '../decrease'

describe('#decrease', () => {
  describe('Simple decrease', () => {
    it('it should be returned array', () => {
      expect(decrease(8, 4)).toEqual([8, 7, 6, 5])
      expect(decrease(5, -2)).toEqual([5, 4, 3, 2, 1, 0, -1])
    })

    it('it will not decrease', () => {
      expect(() => decrease(4, 8)).toThrow()
    })
  })
})
