import combineTxt from '../combineTxt'

describe('#combineTxt', () => {
  it('Combine text', () => {
    expect(combineTxt('hello', '-', 'world')).toEqual('hello-world')
    expect(combineTxt('hello', '', 'world')).toEqual('')
  })
})
