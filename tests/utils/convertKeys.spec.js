import { convertKeys } from '~/utils'

describe('#convertKeys', () => {
  describe('Convert key name (composable)', () => {
    it('convert key', () => {
      expect(
        convertKeys(
          {
            hello: 'kidding',
            world: 'lol'
          },
          {
            hello: 'world',
            world: 'hello'
          }
        )
      ).toEqual({
        kidding: 'world',
        lol: 'hello'
      })

      expect(
        convertKeys(
          {
            tony: 'kidding',
            world: 'lol'
          },
          {
            hello: 'world',
            world: 'hello'
          }
        )
      ).toEqual({
        hello: 'world',
        lol: 'hello'
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

      expect(
        convertKeys([], {
          hello: 'world',
          world: 'hello'
        })
      ).toEqual({
        hello: 'world',
        world: 'hello'
      })
    })

    it('empty string', () => {
      expect(
        convertKeys('', {
          hello: 'world',
          world: 'hello'
        })
      ).toEqual({
        hello: 'world',
        world: 'hello'
      })
    })

    it('number zero', () => {
      expect(
        convertKeys(0, {
          hello: 'world',
          world: 'hello'
        })
      ).toEqual({
        hello: 'world',
        world: 'hello'
      })
    })

    it('duplicate', () => {
      expect(
        convertKeys(
          {
            hello: 'tony',
            world: 'tony'
          },
          {
            hello: 'world',
            world: 'hello'
          }
        )
      ).toEqual({
        tony: 'hello'
      })
    })
  })
})
