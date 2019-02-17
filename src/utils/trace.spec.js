import { trace } from '~/utils'

describe('#trace', () => {
  it('display value during compose functions', () => {
    const v = {}

    expect(trace('trace')(v)).toEqual(v)
  })
})
