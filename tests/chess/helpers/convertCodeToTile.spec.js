import { convertCodeToTile } from '~/chess/helper'

describe('#convertCodeToTile', () => {
  it('convert code to tile', () => {
    expect(convertCodeToTile('bPb7')).toEqual('b7')
    expect(convertCodeToTile('wBc1')).toEqual('c1')
  })
})
