import { isEven } from '~/utils'

describe('#isEven', () => {
  it('Is even?', () => {
    expect(isEven(10)).toBeTruthy()
    expect(isEven(13)).toBeFalsy()
    expect(isEven('a')).toBeFalsy()
    expect(isEven([])).toBeFalsy()
  })
})
