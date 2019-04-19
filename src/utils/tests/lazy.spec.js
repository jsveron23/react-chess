import lazy from '../lazy'

describe('#lazy (compose)', () => {
  describe('Delays a calculation until its result is needed', () => {
    it('normal use case', () => {
      expect(lazy('hello')()).toEqual('hello')
      expect(lazy('world')('ignore this!')).toEqual('world')
    })

    it('with action', () => {
      const simplePrepend = (v) => `${v}-world`
      const simpleAppend = (v) => `hello-${v}`

      expect(lazy.withAction(simplePrepend)('hello')()).toEqual('hello-world')
      expect(lazy.withAction(simpleAppend, 'world')('ignore this!')).toEqual('hello-world')
    })
  })
})
