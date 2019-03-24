import { pass } from '~/utils'

describe('#pass', () => {
  it('return empty string except true', () => {
    expect(pass(true, ['hello'])).toEqual(['hello'])
    expect(pass(false, 'world')).toEqual('')
  })
})
