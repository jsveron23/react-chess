import getSpecial from '../getSpecial'

describe('#getSpecial', () => {
  describe('Get special movement', () => {
    it('from constant', () => {
      const K = ['castling']
      const N = ['jumpover']
      const P = ['doubleStep', 'enPassant', 'promotion']

      expect(getSpecial('P')).toEqual(P)
      expect(getSpecial('K')).toEqual(K)
      expect(getSpecial('N')).toEqual(N)
      expect(getSpecial('Q')).toEqual([])
    })
  })
})
