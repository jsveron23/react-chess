import convertAxisToTile from '../convertAxisToTile'

describe('#convertAxisToTile', () => {
  it('Convert axis to tile', () => {
    expect(convertAxisToTile([4, 3])).toEqual('d3')
    expect(convertAxisToTile([4, -3])).toEqual('')

    // throw
    expect(() => convertAxisToTile()).toThrow()
    expect(() => convertAxisToTile([4, 3, 5])).toThrow()
    expect(() => convertAxisToTile(4)).toThrow()
    expect(() => convertAxisToTile({ hello: 4, world: 3 })).toThrow()
  })
})
