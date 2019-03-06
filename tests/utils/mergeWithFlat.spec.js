import { mergeWithFlat } from '~/utils'

describe('#mergeWithFlat', () => {
  it('merge array with flat value', () => {
    expect(mergeWithFlat([1])(2)).toEqual([1, 2])
    expect(mergeWithFlat(['hello'])('world')).toEqual(['hello', 'world'])
    expect(mergeWithFlat(['hello'])({})).toEqual(['hello', {}])
  })
})
