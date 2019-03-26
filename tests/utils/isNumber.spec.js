import { isNumber } from '~/utils'

describe('#isNumber', () => {
  it('Is number?', () => {
    expect(isNumber(12321)).toBeTruthy()
    expect(isNumber('13')).toBeFalsy()
    expect(isNumber(function () {})).toBeFalsy()
    expect(isNumber([])).toBeFalsy()
  })
})
