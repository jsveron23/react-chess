import { getAxis } from '~/chess/libs'

describe('#getAxis', () => {
  it('Get movements tiles', () => {
    expect(getAxis('a2')('P')('white')).toEqual([[1, 3]])
    expect(getAxis('b7', 'P')('black')).toEqual([[2, 6]])
  })
})
