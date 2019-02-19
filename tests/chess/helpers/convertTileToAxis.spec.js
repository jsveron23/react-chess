import { convertTileToAxis } from '~/chess/helpers'

describe('#convertTileToAxis', () => {
  it('convert file, rank to x, y', () => {
    expect(convertTileToAxis({ file: 'a', rank: '7' })).toEqual({
      x: 1,
      y: 7
    })
    expect(convertTileToAxis({ file: 'h', rank: '2' })).toEqual({
      x: 8,
      y: 2
    })
    expect(convertTileToAxis('a7')).toEqual({
      x: 1,
      y: 7
    })
    expect(convertTileToAxis('h2')).toEqual({
      x: 8,
      y: 2
    })
  })
})
