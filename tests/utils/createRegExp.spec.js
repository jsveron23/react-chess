import { createRegExp } from '~/utils'

describe('#createRegExp', () => {
  it('create regular expression from string', () => {
    expect(createRegExp('a')).toEqual(/a/)
    expect(createRegExp('a?asb')).toEqual(/a?asb/)
    expect(createRegExp('[a-z]|[1-9]')).toEqual(/[a-z]|[1-9]/)
    expect(createRegExp.withOptions('g')('a')).toEqual(/a/g)
    expect(createRegExp.withOptions('mg')('ab')).toEqual(/ab/gm)
  })
})
