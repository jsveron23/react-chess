import increase from '../increase'

describe('#increase', () => {
  it('Simple increase', () => {
    expect(increase(5, 8)).toEqual([5, 6, 7])
    expect(increase(-6, -2)).toEqual([-6, -5, -4, -3])
    expect(() => increase(8, 5)).toThrow()
  })
})
