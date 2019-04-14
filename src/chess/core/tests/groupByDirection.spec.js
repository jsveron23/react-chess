import groupByDirection from '../groupByDirection'

describe('#groupByDirection', () => {
  describe('Group by direction', () => {
    it('grouping', () => {
      // prettier-ignore
      const axis1 = [
        [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
        [1, 0], [1, -1], [1, -2], [1, -3], [1, -4], [1, -5], [1, -6],
        [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [0, 1],
        [-1, 1], [-2, 1], [-3, 1], [-4, 1], [-5, 1], [-6, 1]
      ]

      expect(groupByDirection(axis1)).toHaveProperty('vertical', [
        [1, 2],
        [1, 3],
        [1, 4],
        [1, 5],
        [1, 6],
        [1, 7],
        [1, 8],
        [1, 0],
        [1, -1],
        [1, -2],
        [1, -3],
        [1, -4],
        [1, -5],
        [1, -6]
      ])

      expect(groupByDirection(axis1)).toHaveProperty('horizontal', [
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
        [6, 1],
        [7, 1],
        [8, 1],
        [0, 1],
        [-1, 1],
        [-2, 1],
        [-3, 1],
        [-4, 1],
        [-5, 1],
        [-6, 1]
      ])
    })
  })
})
