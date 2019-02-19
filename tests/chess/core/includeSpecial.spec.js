import { includeSpecial } from '~/chess/core'

const SPECIALS = {
  K: ['castling'],
  N: ['jumpover'],
  P: ['doubleStep', 'enPassant', 'promotion']
}

describe('#includeSpecial', () => {
  describe('Include special movable', () => {
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
        includeSpecial('w', specialP, 'a2', snapshot, movableP)
      ).toHaveProperty('movableAxis', [[1, 3], [1, 4]])
    })

    it('promotion', () => {
      const pieceP = 'P'
      const specialP = SPECIALS[pieceP]

      // prettier-ignore
      const prevSnapshot = [
        'bNc6', 'bBa6', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPb5', 'bPc5', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7', 'wPa8',
        'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]

      // prettier-ignore
      const nextSnapshot = [
        'bNc6', 'bBa6', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPb5', 'bPc5', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7', 'wQa8',
        'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]

      expect(
        includeSpecial('w', specialP, 'a8', prevSnapshot, [])
      ).toHaveProperty('snapshot', nextSnapshot)
    })
  })
})
