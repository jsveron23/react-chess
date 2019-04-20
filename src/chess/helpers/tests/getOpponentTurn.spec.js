import getOpponentTurn from '../getOpponentTurn'

describe('#getOpponentTurn', () => {
  describe('Get opponent turn', () => {
    it('return full name', () => {
      expect(getOpponentTurn('w')).toEqual('black')
      expect(getOpponentTurn('b')).toEqual('white')
    })

    it('even given full name', () => {
      expect(getOpponentTurn('white')).toEqual('black')
      expect(getOpponentTurn('black')).toEqual('white')
    })
  })
})
