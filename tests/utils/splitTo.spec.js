import { splitTo } from '~/utils'

describe('#splitTo', () => {
  it('split string and return object as given key names', () => {
    expect(splitTo('', ['abc', 'edf'])('h2')).toEqual({
      abc: 'h',
      edf: '2'
    })

    expect(splitTo('', ['tony', 'jin'], 'h2-w')).toEqual({
      tony: 'h',
      jin: '2'
    })

    expect(splitTo('', [function () {}, 'jin'], 'h2-w')).toEqual({
      jin: '2'
    })
  })
})
