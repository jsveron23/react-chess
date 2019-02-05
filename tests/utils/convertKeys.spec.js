import { convertKeys } from '~/utils'

describe('#convertKeys', () => {
  it('convert keys from object', () => {
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
})
