import { convertTileToAxis } from '~/chess/helper'

describe('#convertTileToAxis', () => {
  it('convert file, rank to x, y', () => {
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
