import either from '../either'

describe('#either', () => {
  it('Callback returns boolean that decide which function will use', () => {
    const add = (a, b) => a + b
    const minus = (a, b) => a - b

    const fns = [add, minus]
    const args = [2, 4]

    const awaitEither = either(fns, args)

    expect(awaitEither((a, b) => a < b)).toEqual(add(...args))
    expect(awaitEither((a, b) => a > b)).toEqual(minus(...args))
    expect(() => awaitEither([])).toThrow()
    expect(() => awaitEither(0)).toThrow()
    expect(() => awaitEither(() => {})).toThrow()
    expect(() => either([jest.fn()], [1, 2], jest.fn())).toThrow()
    expect(() => either([jest.fn(), jest.fn()], [2], jest.fn())).toThrow()
  })
})
