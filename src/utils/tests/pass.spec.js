import pass from '../pass'

describe('#pass (compose)', () => {
  describe('Pass empty string unless true', () => {
    it('normal use case', () => {
      expect(pass(true, ['hello'])).toEqual(['hello'])
      expect(pass(false, 'world')).toEqual('')
    })

    it('first parameter has to be boolean type', () => {
      expect(() => pass({}, ['hello'])).toThrow()
      expect(() => pass('', 'world')).toThrow()
    })
  })
})
