import replaceSnapshot from '../replaceSnapshot'

describe('#replaceSnapshot', () => {
  describe('Replace code inside snapshot', () => {
    it('code change', () => {
      const awaitReplaceSnapshot = replaceSnapshot('bQa1')

      expect(awaitReplaceSnapshot('a1')(['wRa1'])).toEqual(['bQa1'])
      expect(awaitReplaceSnapshot('', ['wRa1'])).toEqual(['wRa1'])
    })
  })
})
