import detectRemainByAxis from '../detectRemainByAxis'

describe('#detectRemainByAxis', () => {
  it('Is piece there?', () => {
    // prettier-ignore
    const snapshot = [
      'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
      'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
      'wPa3', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
      'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
    ]

    expect(detectRemainByAxis(snapshot)([2, 2])).toBeTruthy()
    expect(detectRemainByAxis(snapshot)([4, 5])).toBeFalsy()
    expect(detectRemainByAxis('')([4, 5])).toBeFalsy()
    expect(detectRemainByAxis('')('')).toBeFalsy()
  })
})
