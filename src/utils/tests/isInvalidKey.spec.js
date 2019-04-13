import { isInvalidKey } from '~/utils'

describe('#isInvalidKey', () => {
  it('Is invalid key for object?', () => {
    expect(isInvalidKey(12321)).toBeFalsy()
    expect(isInvalidKey('13')).toBeFalsy()
    expect(isInvalidKey(function () {})).toBeTruthy()
    expect(isInvalidKey([])).toBeTruthy()
  })
})
