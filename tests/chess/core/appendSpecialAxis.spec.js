import { appendSpecialAxis } from '~/chess/core'

const SPECIALS = {
  K: ['castling'],
  N: ['jumpover'],
  P: ['doubleStep', 'enPassant', 'promotion']
}

// TODO: enhance (En Passant)
describe('#appendSpecialAxis', () => {
  describe('append special axis', () => {
    it('doubleStep', () => {
      // prettier-ignore
      const timeline = [
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]
      ]
      const pieceP = 'P'
      const specialP = SPECIALS[pieceP]
      const movableP = [[1, 3]]

      expect(
        appendSpecialAxis('w', specialP, 'a2', timeline, movableP)
      ).toEqual([[1, 3], [1, 4]])
    })

    it('doubleStep: all blocked', () => {
      // prettier-ignore
      const timeline = [
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa3', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]
      ]
      const pieceP = 'P'
      const specialP = SPECIALS[pieceP]
      const movableP = [[1, 3]]

      expect(
        appendSpecialAxis('w', specialP, 'a2', timeline, movableP)
      ).toEqual([])
    })

    it('doubleStep: 1 tile is blocked', () => {
      // prettier-ignore
      const timeline = [
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa4', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]
      ]
      const pieceP = 'P'
      const specialP = SPECIALS[pieceP]
      const movableP = [[1, 3]]

      expect(
        appendSpecialAxis('w', specialP, 'a2', timeline, movableP)
      ).toEqual([[1, 3]])
    })

    it('doubleStep: not => case 1', () => {
      // prettier-ignore
      const timeline = [
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa3', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa3', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]
      ]
      const pieceP = 'P'
      const specialP = SPECIALS[pieceP]
      const movableP = [[1, 4]]

      expect(
        appendSpecialAxis('w', specialP, 'a3', timeline, movableP)
      ).toEqual([[1, 4]])
    })

    it('doubleStep: not => case 2', () => {
      // prettier-ignore
      const timeline = [
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa4', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa3', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]
      ]
      const pieceP = 'P'
      const specialP = SPECIALS[pieceP]
      const movableP = [[1, 4]]

      expect(
        appendSpecialAxis('w', specialP, 'a3', timeline, movableP)
      ).toEqual([])
    })

    it('enPassant: capture', () => {
      // prettier-ignore
      const timeline = [
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb5', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa4', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ],
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]
      ]
      const pieceP = 'P'
      const specialP = SPECIALS[pieceP]
      const movableP = [[1, 5]]

      expect(
        appendSpecialAxis('w', specialP, 'a4', timeline, movableP)
      ).toEqual(expect.arrayContaining([[1, 5]]))
      expect(
        appendSpecialAxis('w', specialP, 'a4', timeline, movableP)
      ).toEqual(expect.arrayContaining([[2, 5]]))
    })

    it('enPassant: with doubleStep', () => {
      // prettier-ignore
      const timeline = [
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe3', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf5', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]

      ]
      const pieceP = 'P'
      const specialP = SPECIALS[pieceP]
      const movableP = [[4, 3]]

      expect(
        appendSpecialAxis('w', specialP, 'd2', timeline, movableP)
      ).toEqual(expect.arrayContaining([[4, 3]]))
      expect(
        appendSpecialAxis('w', specialP, 'd2', timeline, movableP)
      ).toEqual(expect.arrayContaining([[4, 4]]))
      expect(
        appendSpecialAxis('w', specialP, 'd2', timeline, movableP)
      ).toEqual(expect.arrayContaining([[5, 3]]))
    })
  })
})
