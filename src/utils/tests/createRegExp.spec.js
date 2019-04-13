import { createRegExp } from '~/utils'

describe('#createRegExp', () => {
  test('Create regular expression', () => {
    expect(createRegExp('a')).toEqual(/a/)
    expect(createRegExp('a?asb')).toEqual(/a?asb/)
    expect(createRegExp('[a-z]|[1-9]')).toEqual(/[a-z]|[1-9]/)
    expect(createRegExp.withOptions(null)('a')).toEqual(/a/)
    expect(createRegExp.withOptions('g')('a')).toEqual(/a/g)
    expect(createRegExp.withOptions('mg')('ab')).toEqual(/ab/gm)
  })
})
