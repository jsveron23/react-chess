import { isString } from '~/utils'

describe('#isString', () => {
  it('Is string?', () => {
    expect(isString('123213')).toBeTruthy()
    expect(isString(13)).toBeFalsy()
    expect(isString(function () {})).toBeFalsy()
    expect(isString([])).toBeFalsy()
  })
})
