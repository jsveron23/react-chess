import { transformXY } from '~/chess/helpers'

describe('#transformXY', () => {
  it('transform file, rank to x, y', () => {
    expect(transformXY({ fileName: 'a', rankName: '7' })).toEqual({
      x: 1,
      y: 7
    })
    expect(transformXY({ fileName: 'h', rankName: '2' })).toEqual({
      x: 8,
      y: 2
    })
    expect(transformXY('a7')).toEqual({
      x: 1,
      y: 7
    })
    expect(transformXY('h2')).toEqual({
      x: 8,
      y: 2
    })
  })
})
