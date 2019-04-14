import getFile from '../getFile'

describe('#getFile', () => {
  describe('Get a file', () => {
    it('from constant', () => {
      expect(getFile(1)).toEqual('a')
      expect(getFile(2)).toEqual('b')
      expect(getFile(7)).toEqual('g')
      expect(getFile(8)).toEqual('h')
    })
  })
})
