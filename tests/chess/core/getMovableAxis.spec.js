import { getMovableAxis } from '~/chess/core'

describe('#getMovableAxis', () => {
  it('get movable axis', () => {
    expect(getMovableAxis('a2')('white')('P')).toEqual([[1, 3]])
    expect(getMovableAxis('b7', 'black')('P')).toEqual([[2, 6]])
  })
})
