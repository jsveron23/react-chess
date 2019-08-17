import convertFileToX from '../convertFileToX'

describe('#convertFileToX', () => {
  it('Convert file to x', () => {
    expect(convertFileToX('a')).toEqual(1)
    expect(convertFileToX('d')).toEqual(4)
    expect(convertFileToX('z')).toEqual(-1)
  })
})
