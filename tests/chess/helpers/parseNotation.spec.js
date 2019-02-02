import { parseNotation } from '~/chess/libs'

describe('#parseNotation', () => {
  it('divides notation as single character', () => {
    expect(parseNotation('bRa8')).toEqual({
      piece: 'R',
      side: 'b',
      file: 'a',
      rank: '8'
    })
  })
})
