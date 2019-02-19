import { findCode } from '~/chess/helpers'

// prettier-ignore
const snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa3', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
]

describe('#findCode', () => {
  it('get a code that includes token', () => {
    expect(findCode(snapshot, 'b7')).toEqual('bPb7')
    expect(findCode(snapshot)('c2')).toEqual('wPc2')
    expect(findCode(snapshot, 'wK')).toEqual('wKe1')
    expect(findCode(snapshot)('bR')).toEqual('bRa8')
  })
})
