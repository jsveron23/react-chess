import { getSpecial } from '~/chess/libs'

const K = ['castling']
const N = ['jumpover']
const P = ['doubleStep', 'enPassant', 'promotion']

describe('#getSpecial', () => {
  it('get special movements', () => {
    expect(getSpecial('P')).toEqual(P)
    expect(getSpecial('K')).toEqual(K)
    expect(getSpecial('N')).toEqual(N)
    expect(getSpecial('Q')).toBeUndefined()
  })
})
