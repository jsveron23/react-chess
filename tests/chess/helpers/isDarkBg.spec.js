import { isDarkBg } from '~/chess/helpers'

describe('#isDarkBg', () => {
  it('is dark background on tile?', () => {
    expect(isDarkBg('b2')).toBeTruthy()
    expect(isDarkBg('d1')).toBeFalsy()
  })
})
