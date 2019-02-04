import { includeSpecialMovable } from '~/chess/core'

const SPECIALS = {
  K: ['castling'],
  N: ['jumpover'],
  P: ['doubleStep', 'enPassant', 'promotion']
}

describe('#includeSpecialMovable', () => {
  it('Include special movable', () => {
    const pieceP = 'P'
    const specialP = SPECIALS[pieceP]
    const movableP = ['a3']

    expect(
      includeSpecialMovable(pieceP, 'w', specialP, 'a2', movableP)
    ).toEqual(['a3', 'a4'])
  })
})
