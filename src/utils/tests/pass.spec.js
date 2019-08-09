import pass from '../pass'

describe('#pass', () => {
  it('Pass value if true, otherwise empty string', () => {
    expect(pass(true, ['hello'])).toEqual(['hello'])
    expect(pass(true, { hello: 'world' })).toEqual({ hello: 'world' })
    expect(pass(false, 'world')).toEqual('')
    expect(() => pass({}, ['hello'])).toThrow()
    expect(() => pass('', 'world')).toThrow()
  })
})
