import { getFileRankName } from '../../src/utils/chess'

describe('utils/chess.js', () => {
  describe('#getFileRankName', () => {
    it('Get rank and file name', () => {
      expect(getFileRankName('bN')).toEqual({ fileName: 'b', rankName: 'N' })
      expect(getFileRankName('wK')).toEqual({ fileName: 'w', rankName: 'K' })
      expect(getFileRankName('K')).toEqual({ rankName: 'K' })
      expect(getFileRankName('b')).toEqual({ fileName: 'b' })
    })
  })
})
