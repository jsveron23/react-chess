import { convertKeys } from '~/utils'

describe('#convertKeys', () => {
  describe('convert keys from object', () => {
    it('convert key', () => {
      expect(
        convertKeys(
          {
            hello: 'kidding'
          },
          {
            hello: 'world',
            world: 'hello'
          }
        )
      ).toEqual({
        kidding: 'world',
        world: 'hello'
      })
    })

    it('empty object', () => {
      expect(
        convertKeys(
          {},
          {
            hello: 'world',
            world: 'hello'
          }
        )
      ).toEqual({
        hello: 'world',
        world: 'hello'
      })
    })
  })
})
