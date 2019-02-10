import { parseSelected } from '~/chess/helpers'

// prettier-ignore
const lineup = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa3', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
]

describe('#parseSelected', () => {
  it('get selected lineup item', () => {
    expect(parseSelected('b2-w', lineup)).toHaveProperty('piece', 'P')
    expect(parseSelected('e7-b')(lineup)).toHaveProperty('side', 'b')
    expect(parseSelected('g8-b', lineup)).toHaveProperty('file', 'g')
    expect(parseSelected('d1-w')(lineup)).toHaveProperty('rank', '1')
  })
})
