import { createRegExp } from '~/utils'

describe('#createRegExp', () => {
  it('create regular expression with text', () => {
    expect(createRegExp('a')).toEqual(/a/)
  })
})
