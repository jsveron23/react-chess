import { transformFileToX } from '~/chess/helpers'

describe('#transformFileToX', () => {
  it('transform file to x', () => {
    expect(transformFileToX('a')).toEqual(1)
    expect(transformFileToX('d')).toEqual(4)
  })
})
