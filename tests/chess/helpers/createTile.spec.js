import { createTile } from '~/chess/helpers'

describe('#createTile', () => {
  it('find a code by token', () => {
    expect(createTile('b', '7')).toEqual('b7')
    expect(createTile('c', '2')).toEqual('c2')
    expect(createTile('', '2')).toEqual('')
    expect(createTile('h', '')).toEqual('')
  })
})
