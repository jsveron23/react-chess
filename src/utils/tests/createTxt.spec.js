import createTxt from '../createTxt'

describe('#createTxt', () => {
  it('Create text', () => {
    expect(createTxt('hello', '-', 'world')).toEqual('hello-world')
    expect(createTxt('hello', '', 'world')).toEqual('')
  })
})
