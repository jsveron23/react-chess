import getTurn from '../getTurn'

describe('#getTurn', () => {
  it('Get turn', () => {
    expect(getTurn('w')).toEqual('white')
    expect(getTurn('b')).toEqual('black')
    expect(getTurn('white')).toEqual('white')
    expect(getTurn('black')).toEqual('black')
  })
})
