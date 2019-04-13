import { detectDarkBg } from '~/chess/helpers'

describe('#detectDarkBg', () => {
  it('is dark background?', () => {
    expect(detectDarkBg('b2')).toBeTruthy()
    expect(detectDarkBg('d1')).toBeFalsy()
  })
})
