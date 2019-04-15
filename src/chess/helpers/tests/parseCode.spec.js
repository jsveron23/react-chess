import parseCode from '../parseCode'

describe('#parseCode', () => {
  describe('Divides a code as single character', () => {
    it('split', () => {
      expect(parseCode('bRa8')).toEqual({
        piece: 'R',
        side: 'b',
        file: 'a',
        rank: '8',
        tile: 'a8'
      })
    })
  })
})
