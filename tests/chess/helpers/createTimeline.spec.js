import { createTimeline } from '~/chess/helpers'

// prettier-ignore
const presentSnapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb5', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNf3', 'wRh1'
]

// prettier-ignore
const past = [{
  snapshot: [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb5', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ]
}, {
  snapshot: [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ]
}, {
  snapshot: [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ]
}, {
  snapshot: [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ]
}, {
  snapshot: [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ]
}]

// prettier-ignore
const timeline = [
  [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb5', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNf3', 'wRh1'
  ],
  [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ],
  [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ],
  [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ],
  [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ],
  [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb5', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRb1', 'wNc3', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
  ]
]

describe('#createTimeline', () => {
  it('Create snapshot list', () => {
    expect(createTimeline(presentSnapshot, past)).toEqual(timeline)
  })
})
