import {
  getFileRankName,
  parseFileNum,
  parseRankNum,
  getSideBy,
  getMovementsTiles,
  getMovableTiles
} from '~/utils/chess'

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

  describe('#parseFileNum', () => {
    it('Get number of file squence', () => {
      expect(parseFileNum('a')).toEqual(1)
      expect(parseFileNum('d')).toEqual(4)
    })
  })

  describe('#parseRankNum', () => {
    it('Get number of rank squence', () => {
      expect(parseRankNum('1')).toEqual(1)
      expect(parseRankNum('7')).toEqual(7)
    })
  })

  describe('#getSideBy', () => {
    it('Get number of rank squence', () => {
      expect(getSideBy('w')).toEqual('white')
      expect(getSideBy('b')).toEqual('black')
      expect(getSideBy('white')).toEqual('w')
      expect(getSideBy('black')).toEqual('b')
    })
  })

  describe('#getMovementsTiles', () => {
    it('Get movements tiles', () => {
      expect(getMovementsTiles('a2')('P')('white')).toEqual([[1, 3]])
      expect(getMovementsTiles('b7')('P')('black')).toEqual([[2, 6]])
    })
  })

  describe('#getMovableTiles', () => {
    it('Get movable tiles', () => {
      expect(getMovableTiles([[1, 3]])).toEqual(['a3'])
      expect(getMovableTiles([[2, 6]])).toEqual(['b6'])
    })
  })
})
