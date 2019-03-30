import { detectOpponentByCode } from '~/chess/helper'

describe('#detectOpponentByCode', () => {
  it('detect opponent', () => {
    expect(detectOpponentByCode('w', 'bBc8')).toBeTruthy()
    expect(detectOpponentByCode('b', 'bBc8')).toBeFalsy()
  })
})
