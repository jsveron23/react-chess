import { replaceLineup } from '~/chess/helpers'

describe('#replaceLineup', () => {
  it('replace lineup', () => {
    expect(replaceLineup('b', 'Q', 'a1', ['wRa1'])).toEqual(['bQa1'])
  })
})
