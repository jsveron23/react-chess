import { parseSelectedNotation } from '~/chess/core'

// prettier-ignore
const notations = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa3', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
]

describe('#parseSelectedNotation', () => {
  it('get selected notation', () => {
    expect(parseSelectedNotation(notations, 'b2-w')).toHaveProperty(
      'piece',
      'P'
    )
    expect(parseSelectedNotation(notations)('e7-b')).toHaveProperty('side', 'b')
    expect(parseSelectedNotation(notations, 'g8-b')).toHaveProperty('file', 'g')
    expect(parseSelectedNotation(notations)('d1-w')).toHaveProperty('rank', '1')
  })
})
