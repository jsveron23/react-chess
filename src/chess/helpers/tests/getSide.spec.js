import getSide from '../getSide'

describe('#getSide', () => {
  describe('Get side', () => {
    it('from constant', () => {
      expect(getSide('w')).toEqual('white')
      expect(getSide('b')).toEqual('black')
      expect(getSide('white')).toEqual('w')
      expect(getSide('black')).toEqual('b')
    })
  })
})
