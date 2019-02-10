import { replaceLineup } from '~/chess/helpers'

describe('#replaceLineup', () => {
  it('replace lineup', () => {
    expect(replaceLineup('bQa1', 'a1', ['wRa1'])).toEqual(['bQa1'])
  })
})
