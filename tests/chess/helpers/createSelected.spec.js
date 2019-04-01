import { createSelected } from '~/chess/helpers'

describe('#createSelected', () => {
  it('create selected', () => {
    expect(createSelected('a7')('black')).toEqual('a7-b')
  })
})
