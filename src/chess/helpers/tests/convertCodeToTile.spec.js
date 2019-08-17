import convertCodeToTile from '../convertCodeToTile'

describe('#convertCodeToTile', () => {
  it('Convert code to tile', () => {
    expect(convertCodeToTile('wPa7')).toEqual('a7')
    expect(convertCodeToTile('bRh2')).toEqual('h2')
  })
})
