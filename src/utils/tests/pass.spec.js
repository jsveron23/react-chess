import { pass } from '~/utils'

describe('#pass', () => {
  it('Pass empty string unless true', () => {
    expect(pass(true, ['hello'])).toEqual(['hello'])
    expect(pass(false, 'world')).toEqual('')
  })
})
