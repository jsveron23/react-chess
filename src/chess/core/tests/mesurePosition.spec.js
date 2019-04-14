import mesurePosition from '../mesurePosition'

describe('#mesurePosition', () => {
  describe('Mesure position to be animated', () => {
    it('useSpring', () => {
      // prettier-ignore
      const snapshot = [
        'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPa7', 'bPb5', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
        'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNf3', 'wRh1'
      ]

      // prettier-ignore
      const prevSnapshot = [
        'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
        'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]

      const awaitMesurePosition = mesurePosition(snapshot, prevSnapshot)

      expect(awaitMesurePosition(50)).toHaveProperty('tile', 'b5')
      expect(awaitMesurePosition(30)).toHaveProperty('top', -60)
      expect(awaitMesurePosition(2)).toHaveProperty('top', -4)
      expect(awaitMesurePosition(2)).toHaveProperty('left', 0)
    })
  })
})
