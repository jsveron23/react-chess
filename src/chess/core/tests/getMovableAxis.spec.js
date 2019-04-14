import getMovableAxis from '../getMovableAxis'

describe('#getMovableAxis', () => {
  describe('Get movable axis', () => {
    it('axis list', () => {
      expect(getMovableAxis('a2')('white')('P')).toEqual([[1, 3]])
      expect(getMovableAxis('b7', 'black')('P')).toEqual([[2, 6]])
    })
  })
})
