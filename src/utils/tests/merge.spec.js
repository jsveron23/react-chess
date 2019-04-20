import merge from '../merge'

describe('#merge (compose)', () => {
  describe('Simple merge', () => {
    it('only allow 2 objects', () => {
      expect(merge({ a: 1 })({ b: 2 })).toHaveProperty('a', 1)
      expect(merge({ a: 1 }, { b: 2 })).toHaveProperty('b', 2)
      expect(merge({ a: 1 })({ a: 2 })).toHaveProperty('a', 1)
    })
  })
})
