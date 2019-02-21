import { getMovableAxis } from '~/chess/core'

describe('#getMovableAxis', () => {
  it('get movable axis', () => {
    expect(getMovableAxis('a2')('P')('white')).toEqual([[1, 3]])
    expect(getMovableAxis('b7', 'P')('black')).toEqual([[2, 6]])
  })
})
