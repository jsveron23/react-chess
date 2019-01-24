import { getFileRankName } from '../../src/utils/chess'

describe('utils/chess.js', () => {
  describe('#getFileRankName', () => {
    it('Get rank and file name', () => {
      expect(getFileRankName('1b')).toEqual({ fileName: 'b', rankName: '1' })
      expect(getFileRankName('b9')).toEqual({ fileName: 'b', rankName: '9' })
      expect(getFileRankName('3')).toEqual({ rankName: '3' })
      expect(getFileRankName('d')).toEqual({ fileName: 'd' })
      expect(getFileRankName('d1s')).toEqual({})
    })
  })
})
