import createRegExp from '../createRegExp'

describe('#createRegExp (compose)', () => {
  describe('Create regular expression in compose stream', () => {
    it('normal use case', () => {
      expect(createRegExp('a')).toEqual(/a/)
      expect(createRegExp('a?asb')).toEqual(/a?asb/)
      expect(createRegExp('[a-z]|[1-9]')).toEqual(/[a-z]|[1-9]/)
    })

    it('with options', () => {
      // options are not required, so if this case, use as normal function
      // createRegExp.withOptions(null, 'a') === createRegExp('a')
      expect(createRegExp.withOptions(null, 'a')).toEqual(/a/)

      expect(createRegExp.withOptions('g', 'a')).toEqual(/a/g)
      expect(createRegExp.withOptions('mg')('ab')).toEqual(/ab/gm)
    })
  })
})
