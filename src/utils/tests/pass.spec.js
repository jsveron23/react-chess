import pass from '../pass'

describe('#pass', () => {
  describe('Pass empty string unless true', () => {
    it('only for FP', () => {
      expect(pass(true, ['hello'])).toEqual(['hello'])
      expect(pass(false, 'world')).toEqual('')
    })

    it('it is not work', () => {
      expect(() => pass({}, ['hello'])).toThrow()
      expect(() => pass('', 'world')).toThrow()
    })
  })
})
