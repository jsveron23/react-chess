import parseSelected from '../parseSelected'

describe('#parseSelected', () => {
  describe('Get parsed selected', () => {
    it('split', () => {
      // prettier-ignore
      const snapshot = [
        'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
        'wPa3', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]

      const awaitParsedSelectd = parseSelected(snapshot)

      expect(awaitParsedSelectd('b2-w')).toHaveProperty('piece', 'P')
      expect(awaitParsedSelectd('e7-b')).toHaveProperty('side', 'b')
      expect(awaitParsedSelectd('g8-b')).toHaveProperty('file', 'g')
      expect(awaitParsedSelectd('d1-w')).toHaveProperty('rank', '1')
    })
  })
})
