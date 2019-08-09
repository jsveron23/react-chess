import strToRegExp from '../strToRegExp'

describe('#strToRegExp', () => {
  it('Create regular expression from string', () => {
    expect(strToRegExp('a')).toEqual(/a/)
    expect(strToRegExp('a?asb')).toEqual(/a?asb/)
    expect(strToRegExp('[a-z]|[1-9]')).toEqual(/[a-z]|[1-9]/)
  })
})
