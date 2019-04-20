import getFiniteMovableTiles from '../getFiniteMovableTiles'

describe('#getFiniteMovableTiles', () => {
  describe('King got attacked', () => {
    describe('Knight attack', () => {
      const awaitFn = getFiniteMovableTiles('bKe8', 'wKc7')

      it('Knight', () => {
        const getPawnFiniteMovableTiles = awaitFn('N')

        expect(getPawnFiniteMovableTiles(['b8', 'b4', 'c7', 'c5'])).toEqual(['c7'])
      })

      it('Rook', () => {
        expect(awaitFn('R', ['b8'])).toEqual([])
      })

      it('King', () => {
        expect(awaitFn('K', ['e7', 'd8', 'f8', 'd7', 'f7'])).toEqual([
          'e7',
          'd8',
          'f8',
          'd7',
          'f7'
        ])
      })
    })

    describe('Straight - X', () => {
      describe('left -> right', () => {
        const awaitFn = getFiniteMovableTiles('wKf3', 'bQa3')

        it('Pawn', () => {
          const getPawnFiniteMovableTiles = awaitFn('P')

          expect(getPawnFiniteMovableTiles(['d3', 'd4'])).toEqual(['d3'])
          expect(getPawnFiniteMovableTiles(['g3', 'g4'])).toEqual([])
        })

        it('Bishop', () => {
          expect(awaitFn('B', ['e2', 'd3', 'c4', 'b5', 'a6'])).toEqual(['d3'])
        })

        it('King', () => {
          const movableTiles = ['f2', 'f4', 'e3', 'g3', 'e2', 'e4', 'g2', 'g4']

          expect(awaitFn('K', movableTiles)).toEqual(['f2', 'f4', 'e2', 'e4', 'g2', 'g4'])
        })
      })

      describe('right -> left', () => {
        // prettier-ignore
        const awaitFn = getFiniteMovableTiles('wKc3', 'bQg3')

        it('Pawn', () => {
          const getPawnFiniteMovableTiles = awaitFn('P')

          expect(getPawnFiniteMovableTiles(['d3', 'd4'])).toEqual(['d3'])
          expect(getPawnFiniteMovableTiles(['b3', 'b4'])).toEqual([])
        })

        it('Queen', () => {
          expect(awaitFn('Q', ['d2', 'd3', 'e1'])).toEqual(['d3'])
        })

        it('King', () => {
          const movableTiles = ['c2', 'c4', 'b3', 'd3', 'b2', 'b4', 'd2', 'd4']

          expect(awaitFn('K', movableTiles)).toEqual(['c2', 'c4', 'b2', 'b4', 'd2', 'd4'])
        })
      })
    })

    describe('Straight - Y', () => {
      describe('down -> up', () => {
        const awaitFn = getFiniteMovableTiles('bKg5', 'wQg3')

        it('Bishop', () => {
          expect(awaitFn('B', ['d7', 'e6', 'f5', 'g4', 'h3'])).toEqual(['g4'])
        })

        it('King', () => {
          const movableTiles = ['g6', 'g4', 'f5', 'h5', 'f6', 'f4', 'h6', 'h4']

          expect(awaitFn('K', movableTiles)).toEqual(['f5', 'h5', 'f6', 'f4', 'h6', 'h4'])
        })
      })

      describe('up -> down', () => {
        const awaitFn = getFiniteMovableTiles('bKf4', 'wQf6')

        it('Bishop', () => {
          expect(awaitFn('B', ['d7', 'e6', 'f5', 'g4', 'h3'])).toEqual(['f5'])
        })

        it('Knight', () => {
          expect(awaitFn('N', ['f6', 'h6', 'e7'])).toEqual(['f6'])
        })

        it('King', () => {
          const movableTiles = ['f5', 'f3', 'e4', 'g4', 'e5', 'e3', 'g5', 'g3']

          expect(awaitFn('K', movableTiles)).toEqual(['e4', 'g4', 'e5', 'e3', 'g5', 'g3'])
        })
      })
    })

    describe('Diagonal (White in danger)', () => {
      describe('left:by/right:to', () => {
        // prettier-ignore
        const awaitFn = getFiniteMovableTiles('wKe1', 'bQa5')

        it('Pawn', () => {
          const getPawnFiniteMovableTiles = awaitFn('P')

          expect(getPawnFiniteMovableTiles(['c3', 'c4'])).toEqual(['c3'])
          expect(getPawnFiniteMovableTiles(['a2'])).toEqual([])
        })

        it('Bishop', () => {
          expect(awaitFn('B', ['f4', 'g5', 'h6', 'd2', 'c1'])).toEqual(['d2'])
        })

        it('King', () => {
          expect(awaitFn('K', ['e2', 'd1', 'f1', 'd2', 'f2'])).toEqual([
            'e2',
            'd1',
            'f1',
            'f2'
          ])
        })
      })

      describe('right:by/left:to', () => {
        // prettier-ignore
        const awaitFn = getFiniteMovableTiles('wKe1', 'bQh4')

        it('Pawn', () => {
          const getPawnFiniteMovableTiles = awaitFn('P')

          expect(getPawnFiniteMovableTiles(['g3', 'g4'])).toEqual(['g3'])
          expect(getPawnFiniteMovableTiles(['a3', 'a4'])).toEqual([])
        })

        it('Knight', () => {
          expect(awaitFn('N', ['g1', 'g5', 'f2', 'f4'])).toEqual(['f2'])
        })

        it('King', () => {
          expect(awaitFn('K', ['g1', 'g5', 'f2', 'f4'])).toEqual(['g1', 'g5', 'f4'])
        })
      })
    })

    describe('Diagonal (Black in danger)', () => {
      describe('left:by/right:to', () => {
        const awaitFn = getFiniteMovableTiles('bKe8', 'wQa4')

        it('Pawn', () => {
          const getPawnFiniteMovableTiles = awaitFn('P')

          expect(getPawnFiniteMovableTiles(['c6', 'c5'])).toEqual(['c6'])
          expect(getPawnFiniteMovableTiles(['a6', 'a5'])).toEqual([])
        })

        it('Rook', () => {
          expect(awaitFn('R', [])).toEqual([])
        })

        it('King', () => {
          expect(awaitFn('K', ['e7', 'd8', 'f8', 'd7', 'f7'])).toEqual([
            'e7',
            'd8',
            'f8',
            'f7'
          ])
        })
      })

      describe('right:by/left:to', () => {
        const awaitFn = getFiniteMovableTiles('bKe8', 'wQh5')

        it('Pawn', () => {
          const getPawnFiniteMovableTiles = awaitFn('P')

          expect(getPawnFiniteMovableTiles(['g6', 'g5'])).toEqual(['g6'])
          expect(getPawnFiniteMovableTiles(['h6'])).toEqual([])
        })

        it('Bishop', () => {
          expect(awaitFn('B', [])).toEqual([])
        })

        it('King', () => {
          expect(awaitFn('K', ['e7', 'd8', 'f8', 'd7', 'f7'])).toEqual([
            'e7',
            'd8',
            'f8',
            'd7'
          ])
        })
      })
    })
  })
})
