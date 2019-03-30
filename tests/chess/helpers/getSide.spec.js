import { getSide } from '~/chess/helper'

describe('#getSide', () => {
  it('get side', () => {
    expect(getSide('w')).toEqual('white')
    expect(getSide('b')).toEqual('black')
    expect(getSide('white')).toEqual('w')
    expect(getSide('black')).toEqual('b')
  })
})
