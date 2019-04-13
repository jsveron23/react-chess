import { getFiniteMovableTiles } from '~/chess/core'

describe('#getFiniteMovableTiles', () => {
  describe('King got attacked by Queen', () => {
    describe('Y axis attack', () => {
      describe('down -> up', () => {
        const awaitFn = getFiniteMovableTiles('bKg5', 'wQg3')

        test('Bishop', () => {
          expect(awaitFn('B', ['d7', 'e6', 'f5', 'g4', 'h3'])).toEqual(['g4'])
        })

        test('King', () => {
          const movableTiles = ['g6', 'g4', 'f5', 'h5', 'f6', 'f4', 'h6', 'h4']

          expect(awaitFn('K', movableTiles)).toEqual(['f5', 'h5', 'f6', 'f4', 'h6', 'h4'])
        })
      })

      describe('up -> down', () => {
        const awaitFn = getFiniteMovableTiles('bKf4', 'wQf6')

        test('Bishop', () => {
          expect(awaitFn('B', ['d7', 'e6', 'f5', 'g4', 'h3'])).toEqual(['f5'])
        })

        test('Knight', () => {
          expect(awaitFn('N', ['f6', 'h6', 'e7'])).toEqual(['f6'])
        })

        test('King', () => {
          const movableTiles = ['f5', 'f3', 'e4', 'g4', 'e5', 'e3', 'g5', 'g3']

          expect(awaitFn('K', movableTiles)).toEqual(['e4', 'g4', 'e5', 'e3', 'g5', 'g3'])
        })
      })

      describe('left -> right', () => {
        const awaitFn = getFiniteMovableTiles('wKf3', 'bQa3')

        test('Pawn', () => {
          const getPawnFiniteMovableTiles = awaitFn('P')

          expect(getPawnFiniteMovableTiles(['d3', 'd4'])).toEqual(['d3'])
          expect(getPawnFiniteMovableTiles(['g3', 'g4'])).toEqual([])
        })

        test('Bishop', () => {
          expect(awaitFn('B', ['e2', 'd3', 'c4', 'b5', 'a6'])).toEqual(['d3'])
        })

        test('King', () => {
          const movableTiles = ['f2', 'f4', 'e3', 'g3', 'e2', 'e4', 'g2', 'g4']

          expect(awaitFn('K', movableTiles)).toEqual(['f2', 'f4', 'e2', 'e4', 'g2', 'g4'])
        })
      })

      describe('right -> left', () => {
        // prettier-ignore
        const awaitFn = getFiniteMovableTiles('wKc3', 'bQg3')

        test('Pawn', () => {
          const getPawnFiniteMovableTiles = awaitFn('P')

          expect(getPawnFiniteMovableTiles(['d3', 'd4'])).toEqual(['d3'])
          expect(getPawnFiniteMovableTiles(['b3', 'b4'])).toEqual([])
        })

        test('Queen', () => {
          expect(awaitFn('Q', ['d2', 'd3', 'e1'])).toEqual(['d3'])
        })

        test('King', () => {
          const movableTiles = ['c2', 'c4', 'b3', 'd3', 'b2', 'b4', 'd2', 'd4']

          expect(awaitFn('K', movableTiles)).toEqual(['c2', 'c4', 'b2', 'b4', 'd2', 'd4'])
        })
      })
    })

    describe('Diagonal', () => {
      describe('left:by/right:to', () => {
        const awaitFn = getFiniteMovableTiles('bKe8', 'wQa4')

        test('Pawn', () => {
          const getPawnFiniteMovableTiles = awaitFn('P')

          expect(getPawnFiniteMovableTiles(['c6', 'c5'])).toEqual(['c6'])
          expect(getPawnFiniteMovableTiles(['a6', 'a5'])).toEqual([])
        })

        test('Rook', () => {
          expect(awaitFn('R', [])).toEqual([])
        })

        test('King', () => {
          expect(awaitFn('K', ['e7', 'd8', 'f8', 'd7', 'f7'])).toEqual(['e7', 'd8', 'f8', 'f7'])
        })
      })

      describe('right:by/left:to', () => {
        const awaitFn = getFiniteMovableTiles('bKe8', 'wQh5')

        test('Pawn', () => {
          const getPawnFiniteMovableTiles = awaitFn('P')

          expect(getPawnFiniteMovableTiles(['g6', 'g5'])).toEqual(['g6'])
          expect(getPawnFiniteMovableTiles(['h6'])).toEqual([])
        })

        test('Bishop', () => {
          expect(awaitFn('B', [])).toEqual([])
        })

        test('King', () => {
          expect(awaitFn('K', ['e7', 'd8', 'f8', 'd7', 'f7'])).toEqual(['e7', 'd8', 'f8', 'd7'])
        })
      })
    })
  })

  describe('White side in danger', () => {
    describe('Diagonal', () => {
      describe('left:by/right:to', () => {
        // prettier-ignore
        const awaitFn = getFiniteMovableTiles('wKe1', 'bQa5')

        test('Pawn', () => {
          const getPawnFiniteMovableTiles = awaitFn('P')

          expect(getPawnFiniteMovableTiles(['c3', 'c4'])).toEqual(['c3'])
          expect(getPawnFiniteMovableTiles(['a2'])).toEqual([])
        })

        test('Bishop', () => {
          expect(awaitFn('B', ['f4', 'g5', 'h6', 'd2', 'c1'])).toEqual(['d2'])
        })

        test('King', () => {
          expect(awaitFn('K', ['e2', 'd1', 'f1', 'd2', 'f2'])).toEqual(['e2', 'd1', 'f1', 'f2'])
        })
      })

      describe('right:by/left:to', () => {
        // prettier-ignore
        const awaitFn = getFiniteMovableTiles('wKe1', 'bQh4')

        test('Pawn', () => {
          const getPawnFiniteMovableTiles = awaitFn('P')

          expect(getPawnFiniteMovableTiles(['g3', 'g4'])).toEqual(['g3'])
          expect(getPawnFiniteMovableTiles(['a3', 'a4'])).toEqual([])
        })

        test('Knight', () => {
          expect(awaitFn('N', ['g1', 'g5', 'f2', 'f4'])).toEqual(['f2'])
        })

        test('King', () => {
          expect(awaitFn('K', ['g1', 'g5', 'f2', 'f4'])).toEqual(['g1', 'g5', 'f4'])
        })
      })
    })
  })
})
