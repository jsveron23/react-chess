import detectOutside from '../detectOutside'

describe('#detectOutside', () => {
  it('Detect outside of diagram', () => {
    expect(detectOutside(1, 0)).toBeTruthy()
    expect(detectOutside(1, 8)).toBeFalsy()
    expect(detectOutside(2, 6)).toBeFalsy()
  })
})
