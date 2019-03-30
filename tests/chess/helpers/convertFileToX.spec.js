import { convertFileToX } from '~/chess/helper'

describe('#convertFileToX', () => {
  it('convert file to x', () => {
    expect(convertFileToX('a')).toEqual(1)
    expect(convertFileToX('d')).toEqual(4)
    expect(convertFileToX('z')).toEqual(-1)
  })
})
