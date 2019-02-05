import { parseSelectedLineupItem } from '~/chess/core'

// prettier-ignore
const lineup = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa3', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
]

describe('#parseSelectedLineupItem', () => {
  it('get selected lineup item', () => {
    expect(parseSelectedLineupItem(lineup, 'b2-w')).toHaveProperty('piece', 'P')
    expect(parseSelectedLineupItem(lineup)('e7-b')).toHaveProperty('side', 'b')
    expect(parseSelectedLineupItem(lineup, 'g8-b')).toHaveProperty('file', 'g')
    expect(parseSelectedLineupItem(lineup)('d1-w')).toHaveProperty('rank', '1')
  })
})
