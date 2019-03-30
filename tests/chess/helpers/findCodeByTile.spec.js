import { findCodeByTile } from '~/chess/helper'

// prettier-ignore
const snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa3', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
]

describe('#findCodeByTile', () => {
  it('find a code by tile', () => {
    expect(findCodeByTile(snapshot)('d2')).toHaveProperty('side', 'w')
    expect(findCodeByTile(snapshot)('c8')).toHaveProperty('side', 'b')
    expect(findCodeByTile(snapshot)('c8')).toHaveProperty('piece', 'B')
    expect(findCodeByTile(snapshot)('c8')).toHaveProperty('file', 'c')
    expect(findCodeByTile(snapshot)('c8')).toHaveProperty('rank', '8')
    expect(findCodeByTile(snapshot)('d5')).toEqual({})
  })
})
