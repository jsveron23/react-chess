import { createScoreSheet } from '~/chess/core'

const moveList = [
  {
    white: 'a4'
  },
  {
    black: 'a5'
  },
  {
    white: 'Rb1'
  }
]

describe('#createScoreSheet', () => {
  it('Create score sheet', () => {
    expect(createScoreSheet(moveList)).toEqual([
      {
        white: 'Rb1'
      },
      {
        white: 'a4',
        black: 'a5'
      }
    ])
  })
})
