import { isEven } from '~/utils'

describe('#isEven', () => {
  it('return true if number is true', () => {
    expect(isEven(10)).toBeTruthy()
    expect(isEven(13)).toBeFalsy()
  })
})
