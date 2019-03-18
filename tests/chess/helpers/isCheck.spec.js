import { isCheck } from '~/chess/helpers'

describe('#isCheck', () => {
  it('is check?', () => {
    expect(isCheck('bQa5', 'w')).toBeTruthy()
    expect(isCheck('bQa5', 'b')).toBeFalsy()
    expect(isCheck('wRe4', 'b')).toBeTruthy()
  })
})
