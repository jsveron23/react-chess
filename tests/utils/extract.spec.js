import { extract } from '~/utils'

describe('#extract', () => {
  it('extract value of key from object', () => {
    expect(extract('a')({ a: 1, b: 2, c: 3 })).toEqual(1)
    expect(extract('c', { a: 1, b: 2, c: 3 })).toEqual(3)
  })
})
