import { getPureMovable } from '~/chess/core'

// prettier-ignore
const axis = [
  [7, 7], [8, 6], [9, 5], [10, 4], [11, 3], [12, 2], [13, 1], [5, 7], [1, 3],
  [0, 2], [-1, 1], [7, 9], [8, 10], [9, 11], [10, 12], [11, 13], [12, 14],
  [13, 15], [5, 9], [4, 10], [3, 11], [2, 12], [1, 13], [0, 14], [-1, 15]
]

describe('#getPureMovable', () => {
  it('Get movable tiles', () => {
    expect(getPureMovable([[1, 3]])).toEqual(['a3'])
    expect(getPureMovable([[2, 6]])).toEqual(['b6'])
    expect(getPureMovable(axis)).toEqual(['g7', 'h6', 'e7', 'a3'])
  })
})
