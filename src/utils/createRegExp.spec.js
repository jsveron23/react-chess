import { createRegExp } from '~/utils'

describe('#createRegExp', () => {
  it('create regular expression with text', () => {
    expect(createRegExp('a')).toEqual(/a/)
    expect(createRegExp.withOptions('g')('a')).toEqual(/a/g)
  })
})
