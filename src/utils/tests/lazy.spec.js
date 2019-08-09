import lazy from '../lazy'

describe('#lazy', () => {
  it('Delays a calculation until its result is needed', () => {
    expect(lazy('hello')()).toEqual('hello')
    expect(lazy('world')('ignore this!')).toEqual('world')
  })
})
