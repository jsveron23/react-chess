import detectDarkBg from '../detectDarkBg'

describe('#detectDarkBg', () => {
  it('Is dark background?', () => {
    expect(detectDarkBg('b2')).toBeTruthy()
    expect(detectDarkBg('d1')).toBeFalsy()
  })
})
