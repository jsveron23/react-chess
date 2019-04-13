import { decrease } from '~/utils'

describe('#decrease', () => {
  describe('simple decrease', () => {
    it('it should be returned array', () => {
      expect(decrease(8, 4)).toEqual([8, 7, 6, 5])
    })

    it('it will not decrease', () => {
      expect(decrease(4, 8)).toEqual([])
    })
  })
})
