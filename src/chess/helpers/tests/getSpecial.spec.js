import getSpecial from '../getSpecial'

describe('#getSpecial', () => {
  it('Get special movement', () => {
    const K = ['castling']
    const N = ['jumpover']
    const P = ['doubleStep', 'enPassant', 'promotion']

    expect(getSpecial('P')).toEqual(P)
    expect(getSpecial('K')).toEqual(K)
    expect(getSpecial('N')).toEqual(N)
    expect(getSpecial('Q')).toEqual([])
  })
})
