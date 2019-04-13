import lazy from '../lazy'

describe('#lazy', () => {
  describe('Return value later', () => {
    it('use ramda', () => {
      expect(lazy('hello')()).toEqual('hello')
      expect(lazy('world')('ignore this!')).toEqual('world')
    })
  })
})
