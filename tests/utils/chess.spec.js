import {
  getFileRankName,
  parseFileNum,
  parseRankNum,
  getSideBy,
  getMovements,
  getPureMovable,
  getNextNotations
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

  describe('#getMovements', () => {
    it('Get movements tiles', () => {
      expect(getMovements('a2')('P')('white')).toEqual([[1, 3]])
      expect(getMovements('b7')('P')('black')).toEqual([[2, 6]])
    })
  })

  describe('#getPureMovable', () => {
    it('Get movable tiles', () => {
      expect(getPureMovable([[1, 3]])).toEqual(['a3'])
      expect(getPureMovable([[2, 6]])).toEqual(['b6'])
    })
  })

  describe('#getNextNotations', () => {
    it('Get next notations', () => {
      // prettier-ignore
      const prevNotations = [
        'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
        'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]

      // prettier-ignore
      const nextNotations = [
        'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
        'wPa3', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]

      expect(getNextNotations('a2-w')('a3')(prevNotations)).toEqual(
        nextNotations
      )
    })
  })
})
