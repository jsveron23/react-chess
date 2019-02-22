import { appendSpecialAxis } from '~/chess/core'

const SPECIALS = {
  K: ['castling'],
  N: ['jumpover'],
  P: ['doubleStep', 'enPassant', 'promotion']
}

describe('#appendSpecialAxis', () => {
  describe('append special axis', () => {
    it('doubleStep', () => {
      // prettier-ignore
      const snapshot = [
        'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
        'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]
      const pieceP = 'P'
      const specialP = SPECIALS[pieceP]
      const movableP = [[1, 3]]

      expect(
        appendSpecialAxis('w', specialP, 'a2', snapshot, movableP)
      ).toEqual([[1, 3], [1, 4]])
    })
  })
})
