import { increase } from '~/utils'

describe('#increase', () => {
  describe('simple increase', () => {
    it('it should be returned array', () => {
      expect(increase(5, 8)).toEqual([5, 6, 7])
    })

    it('it will not increase', () => {
      expect(increase(8, 5)).toEqual([])
    })
  })
})
