import replaceSnapshot from '../replaceSnapshot'

describe('#replaceSnapshot', () => {
  it('Replace code of snapshot', () => {
    const mockedSnapshot = ['wRa1']
    const awaitReplaceSnapshot = replaceSnapshot('bQa1')

    expect(awaitReplaceSnapshot('a1')(mockedSnapshot)).toEqual(['bQa1'])
    expect(awaitReplaceSnapshot('', mockedSnapshot)).toEqual(mockedSnapshot)
  })
})
