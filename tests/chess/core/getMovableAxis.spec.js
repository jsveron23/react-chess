import { getMovableAxis } from '~/chess/core'

describe('#getMovableAxis', () => {
  it('Transform movement to tiles', () => {
    expect(getMovableAxis('a2')('P')('white')).toEqual([[1, 3]])
    expect(getMovableAxis('b7', 'P')('black')).toEqual([[2, 6]])
  })
})
