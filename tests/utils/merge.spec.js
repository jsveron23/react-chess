import { merge } from '~/utils'

describe('#merge', () => {
  it('Simple merge', () => {
    expect(merge({ a: 1 })({ b: 2 })).toHaveProperty('a', 1)
    expect(merge({ a: 1 }, { b: 2 })).toHaveProperty('b', 2)
    expect(merge({ a: 1 })({ a: 2 })).toHaveProperty('a', 1)
  })
})
