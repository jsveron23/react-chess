import getSide from '../getSide'

describe('#getSide', () => {
  it('Get side', () => {
    expect(getSide('white')).toEqual('w')
    expect(getSide('black')).toEqual('b')
    expect(getSide('w')).toEqual('w')
    expect(getSide('b')).toEqual('b')
  })
})
