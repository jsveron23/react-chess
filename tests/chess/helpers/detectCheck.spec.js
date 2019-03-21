import { detectCheck } from '~/chess/helpers'

describe('#detectCheck', () => {
  it('Detect is check?', () => {
    expect(detectCheck('bQa5', 'w')).toBeTruthy()
    expect(detectCheck('bQa5', 'b')).toBeFalsy()
    expect(detectCheck('wRe4', 'b')).toBeTruthy()
  })
})
