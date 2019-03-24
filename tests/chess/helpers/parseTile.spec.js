import { parseTile } from '~/chess/helpers'

describe('#parseTile', () => {
  it('divides a tile as single character', () => {
    expect(parseTile('g5')).toEqual({
      file: 'g',
      rank: '5'
    })
  })
})
