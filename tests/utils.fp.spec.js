import { compose, pipe } from '../src/utils/fp'

describe('utils/fp.js', () => {
  const _plus = (a) => (b) => a + b
  const _minus = (a) => (b) => a - b
  const _multiply = (a) => (b) => a * b
  const _devide = (a) => (b) => a / b

  describe('#compose', () => {
    it('Compose functions', () => {
      const result = compose(
        _devide(200),
        _multiply(5),
        _minus(105),
        _plus(1)
      )(100)

      expect(result).toEqual(10)
    })
  })

  describe('#pipe', () => {
    it('Compose functions', () => {
      const result = pipe(
        _devide(200),
        _multiply(5),
        _minus(105),
        _plus(1)
      )(100)

      expect(result).toEqual(96)
    })
  })
})
