import { parseSelected } from '~/chess/helpers'

describe('#parseSelected', () => {
  it('parse selected tile', () => {
    expect(parseSelected('a2-w')).toEqual({
      tile: 'a2',
      side: 'w'
    })
    expect(parseSelected('h8-b')).toEqual({
      tile: 'h8',
      side: 'b'
    })
  })
})
