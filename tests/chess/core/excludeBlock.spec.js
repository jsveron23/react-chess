import { excludeBlock } from '~/chess/core'

// prettier-ignore
const notations1 = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
]

// prettier-ignore
const direction1 = {
  diagonal: [],
  horizontal: ['b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
  vertical: ['a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']
}

// prettier-ignore
const notations2 = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd6', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb3', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
]

// prettier-ignore
const direction2 = {
  diagonal: ['d2', 'e3', 'f4', 'g5', 'h6', 'b2', 'a3'],
  horizontal: [],
  vertical: []
}

describe('#excludeBlock', () => {
  it('exclude bloking path selected piece', () => {
    expect(excludeBlock(notations1, direction1)).toEqual([])
    expect(excludeBlock(notations2, direction2)).toEqual(['b2', 'a3'])
  })
})
