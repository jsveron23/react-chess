import replaceSnapshot from '../replaceSnapshot'

describe('#replaceSnapshot', () => {
  describe('Replace code of snapshot', () => {
    const mockedSnapshot = ['wRa1']
    const awaitReplaceSnapshot = replaceSnapshot('bQa1')

    it('normal use case', () => {
      expect(awaitReplaceSnapshot('a1')(mockedSnapshot)).toEqual(['bQa1'])
    })

    it('no replace', () => {
      expect(awaitReplaceSnapshot('', mockedSnapshot)).toEqual(mockedSnapshot)
    })
  })
})
