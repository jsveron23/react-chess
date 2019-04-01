import { detectOutside } from '~/chess/helpers'

describe('#detectOutside', () => {
  it('detect outside of diagram', () => {
    expect(detectOutside(1, 0)).toBeTruthy()
    expect(detectOutside(1, 8)).toBeFalsy()
    expect(detectOutside(2, 6)).toBeFalsy()
  })
})
