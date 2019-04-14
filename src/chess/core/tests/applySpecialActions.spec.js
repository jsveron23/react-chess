import applySpecialActions from '../applySpecialActions'

describe('#applySpecialActions', () => {
  describe('Apply special actions after moving to tile', () => {
    it('promotion', () => {
      const SPECIALS = {
        K: ['castling'],
        N: ['jumpover'],
        P: ['doubleStep', 'enPassant', 'promotion']
      }

      const pieceP = 'P'
      const specialP = SPECIALS[pieceP]

      // prettier-ignore
      const timeline = [
        [
          'bNc6', 'bBa6', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPb5', 'bPc5', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7', 'wPa8',
          'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]
      ]

      // prettier-ignore
      const nextSnapshot = [
        'bNc6', 'bBa6', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPb5', 'bPc5', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7', 'wQa8',
        'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]

      expect(applySpecialActions('w', specialP, 'a8', timeline)).toEqual(nextSnapshot)
    })
  })
})
