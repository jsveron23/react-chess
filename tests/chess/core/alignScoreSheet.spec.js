import { alignScoreSheet } from '~/chess/core'

const moveList = [{
  white: 'a4'
}, {
  black: 'a5'
}, {
  white: 'Rb1'
}]

describe('#alignScoreSheet', () => {
  it('Align score sheet', () => {
    expect(alignScoreSheet(moveList)).toEqual([{
      white: 'Rb1'
    }, {
      white: 'a4',
      black: 'a5'
    }])
  })
})
