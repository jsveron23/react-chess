import { transformTileToAxis } from '~/chess/helpers'

describe('#transformTileToAxis', () => {
  it('transform file, rank to x, y', () => {
    expect(transformTileToAxis({ file: 'a', rank: '7' })).toEqual({
      x: 1,
      y: 7
    })
    expect(transformTileToAxis({ file: 'h', rank: '2' })).toEqual({
      x: 8,
      y: 2
    })
    expect(transformTileToAxis('a7')).toEqual({
      x: 1,
      y: 7
    })
    expect(transformTileToAxis('h2')).toEqual({
      x: 8,
      y: 2
    })
  })
})
