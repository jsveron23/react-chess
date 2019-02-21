import { createRegExp } from '~/utils'

describe('#createRegExp', () => {
  it('create regular expression from string', () => {
    expect(createRegExp('a')).toEqual(/a/)
    expect(createRegExp('a?asb')).toEqual(/a?asb/)
    expect(createRegExp.withOptions('g')('a')).toEqual(/a/g)
  })
})
