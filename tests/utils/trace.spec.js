import { trace } from '~/utils'

describe('#trace', () => {
  it('display value during compose functions', () => {
    const v1 = {}
    const v2 = function () {}

    expect(trace('trace test1')(v1)).toEqual(v1)
    expect(trace('trace test2')(v2)).toEqual(v2)
  })
})
