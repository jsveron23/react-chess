import { lazy } from '~/utils'

describe('#lazy', () => {
  it('wrapping actual function by applying ramda#thunkify, ramda#identity', () => {
    expect(lazy('hello')()).toEqual('hello')
    expect(lazy('world')('ignore this!')).toEqual('world')
  })
})
