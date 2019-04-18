import getOneSidedCodeList from '../getOneSidedCodeList'

describe('#getOneSidedCodeList', () => {
  describe('Get one sided code list from snapshop', () => {
    it('white only', () => {
      // prettier-ignore
      const snapshot = [
        'bRa8', 'bNb8', 'bBc8', 'bQa5', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPa7', 'bPb7', 'bPc5', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
        'wPa2', 'wPb2', 'wPc2', 'wPd4', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBe3', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]

      // prettier-ignore
      const codeList = [
        'wPa2', 'wPb2', 'wPc2', 'wPd4', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBe3', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]

      expect(getOneSidedCodeList('w', snapshot)).toEqual(codeList)
    })

    it('black only', () => {
      // prettier-ignore
      const snapshot = [
        'bRa8', 'bNb8', 'bBc8', 'bQa5', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPa7', 'bPb7', 'bPc5', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
        'wPa2', 'wPb2', 'wPc2', 'wPd4', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBe3', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
      ]

      // prettier-ignore
      const codeList = [
        'bRa8', 'bNb8', 'bBc8', 'bQa5', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPa7', 'bPb7', 'bPc5', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7'
      ]

      expect(getOneSidedCodeList('w', snapshot)).toEqual(codeList)
    })
  })
})
