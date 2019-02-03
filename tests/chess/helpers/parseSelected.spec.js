import { parseSelected } from '~/chess/helpers'

describe('#parseSelected', () => {
  it('parse selected tile', () => {
    expect(parseSelected('a2-w')).toEqual({
      selectedTile: 'a2',
      selectedSide: 'w'
    })
    expect(parseSelected('h8-b')).toEqual({
      selectedTile: 'h8',
      selectedSide: 'b'
    })
  })
})
