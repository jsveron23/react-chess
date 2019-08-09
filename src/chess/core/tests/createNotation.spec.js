import createNotation from '../createNotation'

// prettier-ignore
// const snapshotListWrong = [
//   [
//     'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
//     'bPa7', 'bPb5', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
//     'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
//     'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNf3', 'wRh1'
//   ],
//   [
//     'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
//     'bPa7', 'bPb5', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
//     'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
//     'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1'
//   ]
// ]

describe('#createNotation', () => {
  describe('Create notation', () => {
    it('normal', () => {
      // prettier-ignore
      const snapshotList = [
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb5', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNf3', 'wRh1'
        ],
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb5', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ],
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ],
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ],
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ],
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]
      ]

      expect(createNotation(snapshotList)).toEqual([
        {
          white: 'Nf3'
        },
        {
          black: 'b5'
        },
        {
          white: 'Rb1'
        },
        {
          black: 'd5'
        },
        {
          white: 'Nc3'
        }
      ])

      expect(createNotation([snapshotList[0]])).toEqual([])
    })

    it('capture', () => {
      // prettier-ignore
      const snapshotList = [
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb5', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ],
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb5', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ],
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ],
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]
      ]

      expect(createNotation(snapshotList)).toEqual([
        {
          white: 'N x b5'
        },
        {
          black: 'b5'
        },
        {
          white: 'Nc3'
        }
      ])

      expect(createNotation([snapshotList[0]])).toEqual([])
    })

    it('throw', () => {
      // prettier-ignore
      const snapshotList = [
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ],
        [
          'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
          'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
          'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
        ]
      ]

      expect(() => createNotation(snapshotList)).toThrow()
    })
  })
})
