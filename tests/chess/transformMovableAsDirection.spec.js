import { transformMovableAsDirection } from '~/chess/libs'

describe('#transformMovableAsDirection', () => {
  it('Get movable with direction', () => {
    const m1 = ['g2', 'h3', 'e2', 'd3', 'c4', 'b5', 'a6']

    // prettier-ignore
    const m2 = ['a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']

    expect(transformMovableAsDirection(m1)).toHaveProperty('diagonal', [
      'g2',
      'h3',
      'e2',
      'd3',
      'c4',
      'b5',
      'a6'
    ])

    expect(transformMovableAsDirection(m2)).toHaveProperty('horizontal', [
      'b1',
      'c1',
      'd1',
      'e1',
      'f1',
      'g1',
      'h1'
    ])

    expect(transformMovableAsDirection(m2)).toHaveProperty('vertical', [
      'a2',
      'a3',
      'a4',
      'a5',
      'a6',
      'a7',
      'a8'
    ])
  })
})
