import {
  flatten,
  getFirst,
  getLast,
  diet,
  toArray,
  replaceFirst,
  replaceLast,
  intersection,
  diff,
  union
} from '../src/utils/generic'

describe('utils/generic.js', () => {
  describe('#flatten', () => {
    it('Should be Flattened', () => {
      expect(flatten([[false], [0], [[2]]])).toEqual([false, 0, 2])
    })
  })

  describe('#getFirst', () => {
    it('Get first item', () => {
      expect(getFirst([[1], [0], [[2]]])).toEqual([1])
    })
  })

  describe('#getLast', () => {
    it('Get last item', () => {
      expect(getLast([[1], [0], [[2]]])).toEqual([[2]])
    })
  })

  describe('#diet', () => {
    it('Remove nullable item', () => {
      expect(diet([1, {}, false, null, [], undefined, ''])).toEqual([1, false])
    })
  })

  describe('#toArray', () => {
    it('Create array', () => {
      expect(toArray({})).toEqual([{}])
      expect(toArray(1, 2, 3, 4)).toEqual([1, 2, 3, 4])
    })
  })

  describe('#replaceFirst', () => {
    it('Replace first item of array', () => {
      expect(replaceFirst([1, 2, 3, 4, 5])(99)).toEqual([99, 2, 3, 4, 5])
    })
  })

  describe('#replaceLast', () => {
    it('Replace last item of array', () => {
      expect(replaceLast([1, 2, 3, 4, 5])(99)).toEqual([1, 2, 3, 4, 99])
    })
  })

  describe('#intersection', () => {
    it('Get intersection data between iterable objects', () => {
      const a = [1, 2, 3, 4, 5]
      const b = [3, 5, 7, 4]
      const ab = intersection(a)(b)

      expect(ab).toContain(3)
      expect(ab).toContain(4)
      expect(ab).toContain(5)

      const x = { a: 1, b: 2 }
      const c = Object.assign(x, { d: 1 })
      const d = Object.assign(x, { d: 1 })

      expect(intersection(c)(d)).toEqual([{ a: 1, b: 2, d: 1 }])

      const e = Object.assign({}, x, { d: 1 })
      const f = Object.assign({}, x, { d: 1 })

      expect(intersection(e)(f)).toEqual([])
    })
  })

  describe('#diff', () => {
    it('Get different data between iterable objects', () => {
      const a = [1, 2, 3, 4, 5]
      const b = [1, 3, 7, 2, 9]
      const ab = diff(a)(b)

      expect(ab).toContain(4)
      expect(ab).toContain(5)
      expect(ab).not.toContain(7)
      expect(ab).not.toContain(9)
    })
  })

  describe('#union', () => {
    it('Get union data between iterable objects', () => {
      const a = [1, 2, 3, 4, 5]
      const b = [1, 3, 7, 2, 9]
      const ab = union(a)(b)

      expect(ab).toContain(1)
      expect(ab).toContain(2)
      expect(ab).toContain(3)
      expect(ab).toContain(4)
      expect(ab).toContain(5)
      expect(ab).not.toContain(6)
      expect(ab).toContain(7)
      expect(ab).not.toContain(8)
      expect(ab).toContain(9)
    })
  })
})
