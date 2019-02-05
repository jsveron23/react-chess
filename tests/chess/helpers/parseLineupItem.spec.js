import { parseLineupItem } from '~/chess/helpers'

describe('#parseLineupItem', () => {
  it('divides a lineup item as single character', () => {
    expect(parseLineupItem('bRa8')).toEqual({
      piece: 'R',
      side: 'b',
      file: 'a',
      rank: '8'
    })
  })
})
