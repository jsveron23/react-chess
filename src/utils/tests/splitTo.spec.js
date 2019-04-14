import splitTo from '../splitTo'

describe('#splitTo', () => {
  describe('Split by token and create object with given key', () => {
    it('valid key', () => {
      expect(splitTo('', ['abc', 'edf'])('h2')).toEqual({
        abc: 'h',
        edf: '2'
      })

      expect(splitTo('-', ['tony', 'jin'], 'h2-w')).toEqual({
        tony: 'h2',
        jin: 'w'
      })
    })

    it('invalid key included', () => {
      expect(splitTo('', [function () {}, 'jin'], 'h2-w')).toEqual({
        jin: '2'
      })
    })
  })
})
