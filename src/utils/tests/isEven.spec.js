import isEven from '../isEven'

describe('#isEven', () => {
  it('Is even number?', () => {
    expect(isEven(10)).toBeTruthy()
    expect(isEven(13)).toBeFalsy()
    expect(() => isEven('a')).toThrow()
    expect(() => isEven([])).toThrow()
  })
})
