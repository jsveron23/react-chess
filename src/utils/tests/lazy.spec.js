import { lazy } from '~/utils'

describe('#lazy', () => {
  it('Thunk', () => {
    expect(lazy('hello')()).toEqual('hello')
    expect(lazy('world')('ignore this!')).toEqual('world')
  })
})
