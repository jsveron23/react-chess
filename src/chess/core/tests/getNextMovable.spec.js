import getNextMovable from '../getNextMovable'

describe('#getNextMovable', () => {
  describe('Get next', () => {
    it('movable tiles', () => {
      const getFlatArgs = () => {
        // prettier-ignore
        const snapshot = [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]

        // prettier-ignore
        const movableAxis = [
          [1, -1], [1, 3],
          [3, -1], [3, 3],
          [0, 0], [0, 2],
          [4, 0], [4, 2]
        ]

        return {
          movableAxis,
          turn: 'white',
          timeline: [snapshot],
          special: ['jumpover'],
          side: 'w',
          tile: 'b1'
        }
      }

      expect(getNextMovable('tiles', getFlatArgs)).toEqual(['a3', 'c3', 'd2'])
    })

    it('movable axis', () => {
      const getFlatArgs = () => {
        // prettier-ignore
        const snapshot = [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc5', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]

        return {
          turn: 'black',
          timeline: [snapshot],
          tile: 'd8'
        }
      }

      // prettier-ignore
      expect(getNextMovable('axis', getFlatArgs)).toEqual([
        [4, 7], [4, 6], [4, 5], [4, 4], [4, 3], [4, 2], [4, 1],
        [4, 9], [4, 10], [4, 11], [4, 12], [4, 13], [4, 14], [4, 15],
        [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8],
        [3, 8], [2, 8], [1, 8], [0, 8], [-1, 8], [-2, 8], [-3, 8],
        [5, 7], [6, 6], [7, 5], [8, 4], [9, 3], [10, 2], [11, 1],
        [3, 7], [2, 6], [1, 5], [0, 4], [-1, 3], [-2, 2], [-3, 1],
        [5, 9], [6, 10], [7, 11], [8, 12], [9, 13], [10, 14], [11, 15],
        [3, 9], [2, 10], [1, 11], [0, 12], [-1, 13], [-2, 14], [-3, 15]
      ])
    })
  })
})
