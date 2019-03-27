import { parseInt10 } from '~/utils'

describe('#parseInt10', () => {
  it('Parse int, 10 redix', () => {
    expect(parseInt10(8)).toEqual(8)
  })
})
