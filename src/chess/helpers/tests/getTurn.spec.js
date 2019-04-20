import getTurn from '../getTurn'

describe('#getTurn', () => {
  describe('Get turn', () => {
    it('return full name', () => {
      expect(getTurn('w')).toEqual('white')
      expect(getTurn('b')).toEqual('black')
    })

    it('even given full name', () => {
      expect(getTurn('white')).toEqual('white')
      expect(getTurn('black')).toEqual('black')
    })
  })
})
