import { transformRankToY } from '~/chess/helpers'

describe('#transformRankToY', () => {
  it('transform rank to y', () => {
    expect(transformRankToY('1')).toEqual(1)
    expect(transformRankToY('7')).toEqual(7)
  })
})
