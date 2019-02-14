import { excludeBlock } from '~/chess/core'

// prettier-ignore
const lineup1 = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
]

// prettier-ignore
const direction1 = {
  diagonal: [],
  horizontal: [
    [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1],
    [0, 1], [-1, 1], [-2, 1], [-3, 1], [-4, 1], [-5, 1], [-6, 1]
  ],
  vertical: [
    [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
    [1, 0], [1, -1], [1, -2], [1, -3], [1, -4], [1, -5], [1, -6]
  ]
}

describe('#excludeBlock', () => {
  it('exclude bloking path selected piece', () => {
    expect(excludeBlock('white', lineup1, direction1)).toEqual([
      [1, 0],
      [1, -1],
      [1, -2],
      [1, -3],
      [1, -4],
      [1, -5],
      [1, -6],
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
