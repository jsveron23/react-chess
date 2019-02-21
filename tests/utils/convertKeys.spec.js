import { convertKeys } from '~/utils'

describe('#convertKeys', () => {
  describe('convert keys as preferred names object', () => {
    const o = {
      hello: 'world',
      world: 'hello'
    }

    it('convert key', () => {
      expect(
        convertKeys(
          {
            hello: 'kidding',
            world: 'lol'
          },
          o
        )
      ).toEqual({
        kidding: 'world',
        lol: 'hello'
      })
    })

    it('empty object', () => {
      expect(convertKeys({}, o)).toEqual({
        hello: 'world',
        world: 'hello'
      })
    })
  })
})
