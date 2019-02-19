import { convertAxisToTile } from '~/chess/helpers'

describe('#convertAxisToTile', () => {
  it('Convert axis to tile', () => {
    expect(convertAxisToTile([4, 3])).toEqual('d3')
    expect(convertAxisToTile([4, -3])).toEqual('')
  })
})
