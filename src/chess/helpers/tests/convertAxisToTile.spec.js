import { convertAxisToTile } from '~/chess/helpers'

describe('#convertAxisToTile', () => {
  it('convert axis to tile', () => {
    expect(convertAxisToTile([4, 3])).toEqual('d3')
    expect(convertAxisToTile([4, -3])).toEqual('')
  })
})
