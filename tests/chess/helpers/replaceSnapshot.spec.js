import { replaceSnapshot } from '~/chess/helpers'

describe('#replaceSnapshot', () => {
  it('replace snapshot', () => {
    expect(replaceSnapshot('bQa1', 'a1')(['wRa1'])).toEqual(['bQa1'])
  })
})
