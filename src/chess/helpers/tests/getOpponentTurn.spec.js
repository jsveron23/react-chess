import getOpponentTurn from '../getOpponentTurn'

describe('#getOpponentTurn', () => {
  it('Get opponent turn', () => {
    expect(getOpponentTurn('w')).toEqual('black')
    expect(getOpponentTurn('b')).toEqual('white')
    expect(getOpponentTurn('white')).toEqual('black')
    expect(getOpponentTurn('black')).toEqual('white')
  })
})
