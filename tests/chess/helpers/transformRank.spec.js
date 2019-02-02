import { transformRank } from '~/chess/libs'

describe('#transformRank', () => {
  it('transform rank as number', () => {
    expect(transformRank('1')).toEqual(1)
    expect(transformRank('7')).toEqual(7)
  })
})
