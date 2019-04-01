import { replaceSnapshot } from '~/chess/helpers'

describe('#replaceSnapshot', () => {
  it('replace snapshot', () => {
    expect(replaceSnapshot('bQa1', 'a1')(['wRa1'])).toEqual(['bQa1'])
    expect(replaceSnapshot('bQa1', '')(['wRa1'])).toEqual(['wRa1'])
  })
})
