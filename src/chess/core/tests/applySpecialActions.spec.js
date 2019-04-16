import applySpecialActions from '../applySpecialActions'

describe('#applySpecialActions', () => {
  describe('Apply special actions after moving piece to tile', () => {
    const SPECIALS = {
      K: ['castling'],
      N: ['jumpover'],
      P: ['doubleStep', 'enPassant', 'promotion']
    }

    it('promotion', () => {
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

    it('enPassant', () => {
      const pieceP = 'P'
      const specialP = SPECIALS[pieceP]

      // prettier-ignore
      const timeline = [
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb5', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh5',
          'wPa2', 'wPb2', 'wPb6', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ],
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh5',
          'wPa2', 'wPb2', 'wPc5', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ],
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh5',
          'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]
      ]

      // prettier-ignore
      const nextSnapshot = [
        'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPa7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh5',
        'wPa2', 'wPb2', 'wPb6', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]

      expect(applySpecialActions('w', specialP, 'b6', timeline)).toEqual(nextSnapshot)
    })
  })
})
