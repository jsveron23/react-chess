import { getPureMovable } from '~/chess/libs'

describe('#getPureMovable', () => {
  it('Get movable tiles', () => {
    expect(getPureMovable([[1, 3]])).toEqual(['a3'])
    expect(getPureMovable([[2, 6]])).toEqual(['b6'])
  })
})
