import createScoreSheet from '../createScoreSheet'

describe('#createScoreSheet', () => {
  describe('Create score sheet', () => {
    it('after creating notations', () => {
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
})
