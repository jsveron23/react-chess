import { convertKeys } from '~/utils'

describe('#convertKeys', () => {
  describe('convert keys as preferred names object', () => {
    const o = {
      hello: 'world',
      world: 'hello'
    }

    it('convert key', () => {
      const o1 = {
        hello: 'kidding',
        world: 'lol'
      }

      const o2 = {
        tony: 'kidding',
        world: 'lol'
      }

      expect(convertKeys(o1, o)).toEqual({
        kidding: 'world',
        lol: 'hello'
      })

      expect(convertKeys(o2, o)).toEqual({
        hello: 'world',
        lol: 'hello'
      })
    })

    it('empty object', () => {
      expect(convertKeys({}, o)).toEqual({
        hello: 'world',
        world: 'hello'
      })

      expect(convertKeys([], o)).toEqual({
        hello: 'world',
        world: 'hello'
      })
    })

    it('empty string', () => {
      expect(convertKeys('', o)).toEqual({
        hello: 'world',
        world: 'hello'
      })
    })

    it('number zero', () => {
      expect(convertKeys(0, o)).toEqual({
        hello: 'world',
        world: 'hello'
      })
    })
  })
})
