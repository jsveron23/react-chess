import detectBlockedAt from '../detectBlockedAt'

describe('#detectBlockedAt', () => {
  it('Index of movabelAxis then check whether it is blocked', () => {
    // prettier-ignore
    const snapshot1 = [
      'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
      'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
      'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
      'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
    ]

    // prettier-ignore
    const snapshot2 = [
      'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
      'bPa7', 'bPb7', 'bPc3', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
      'wPa4', 'wPb5', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
      'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
    ]

    expect(detectBlockedAt(snapshot1)([[2, 3]], 0)).toBeFalsy()
    expect(detectBlockedAt(snapshot2, [[3, 3]], 0)).toBeTruthy()
  })
})
