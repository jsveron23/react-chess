import { findCheckCode } from '~/chess/core'

describe('#findCheckCode', () => {
  it('find check code', () => {
    const getFlatArgs = () => {
      // prettier-ignore
      const snapshot = [
        'bRa8', 'bNb8', 'bBc8', 'bQa5', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPa7', 'bPb7', 'bPc5', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
        'wPa2', 'wPb2', 'wPc2', 'wPd4', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBe3', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]

      return {
        snapshot,
        turn: 'white',
        side: 'b',
        piece: 'Q',
        file: 'a',
        rank: '5'
      }
    }

    expect(findCheckCode(getFlatArgs)).toEqual('bQa5')
  })
})
