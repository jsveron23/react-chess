import detectOpponentByCode from '../detectOpponentByCode'

describe('#detectOpponentByCode', () => {
  it('Detect opponent code check', () => {
    expect(detectOpponentByCode('w', 'bBc8')).toBeTruthy()
    expect(detectOpponentByCode('b', 'bBc8')).toBeFalsy()
  })
})
