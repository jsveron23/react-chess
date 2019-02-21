import { isDarkBg } from '~/chess/helpers'

describe('#isDarkBg', () => {
  it('is dark background?', () => {
    expect(isDarkBg('b2')).toBeTruthy()
    expect(isDarkBg('d1')).toBeFalsy()
  })
})
