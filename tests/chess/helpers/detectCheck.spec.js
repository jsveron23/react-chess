import { detectCheck } from '~/chess/helpers'

describe('#detectCheck', () => {
  it('detect is check?', () => {
    expect(detectCheck('w', 'bQa5')).toBeTruthy()
    expect(detectCheck('b', 'bQa5')).toBeFalsy()
    expect(detectCheck('b', 'wRe4')).toBeTruthy()
  })
})
