import createTxt from '../createTxt'

describe('#createTxt', () => {
  describe('Simple create text with empty check', () => {
    it('normal use case', () => {
      expect(createTxt('hello', '-', 'world')).toEqual('hello-world')
    })

    it('1 empty string given, return empty', () => {
      expect(createTxt('hello', '', 'world')).toEqual('')
    })
  })
})
