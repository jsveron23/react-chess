import parseTile from '../parseTile'

describe('#parseTile', () => {
  it('Split a tile', () => {
    const parsedTile = parseTile('g5')

    expect(parsedTile).toHaveProperty('file', 'g')
    expect(parsedTile).toHaveProperty('rank', '5')
  })
})
