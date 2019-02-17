import { createRegExp } from '~/utils'

describe('#createRegExp', () => {
  it('create regular expression with text', () => {
    expect(createRegExp('a')).toEqual(/a/)
    expect(createRegExp('a?asb')).toEqual(/a?asb/)
    expect(createRegExp.withOptions('g')('a')).toEqual(/a/g)
  })
})
