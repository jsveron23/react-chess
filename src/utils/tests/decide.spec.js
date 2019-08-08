import decide from '../decide'

describe('#decide', () => {
  it('Callback returns boolean that decide which function will use', () => {
    const add = (a, b) => a + b
    const minus = (a, b) => a - b

    const fns = [add, minus]
    const args = [2, 4]

    const awaitDecide = decide(fns, args)

    expect(awaitDecide((a, b) => a < b)).toEqual(add(...args))
    expect(awaitDecide((a, b) => a > b)).toEqual(minus(...args))
    expect(() => awaitDecide([])).toThrow()
    expect(() => awaitDecide(0)).toThrow()
    expect(() => awaitDecide(() => {})).toThrow()
    expect(() => decide([jest.fn()], [1, 2], jest.fn())).toThrow()
    expect(() => decide([jest.fn(), jest.fn()], [2], jest.fn())).toThrow()
  })
})
