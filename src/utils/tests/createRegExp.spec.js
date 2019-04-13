import createRegExp from '../createRegExp'

describe('#createRegExp', () => {
  describe('Create regular expression', () => {
    it('able to use compose function', () => {
      expect(createRegExp('a')).toEqual(/a/)
      expect(createRegExp('a?asb')).toEqual(/a?asb/)
      expect(createRegExp('[a-z]|[1-9]')).toEqual(/[a-z]|[1-9]/)
    })

    it('with options', () => {
      expect(createRegExp.withOptions(null, 'a')).toEqual(/a/)
      expect(createRegExp.withOptions('g', 'a')).toEqual(/a/g)
      expect(createRegExp.withOptions('mg')('ab')).toEqual(/ab/gm)
    })
  })
})
