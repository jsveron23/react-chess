import getSide from '../getSide'

describe('#getSide', () => {
  describe('Get side', () => {
    it('return short name', () => {
      expect(getSide('white')).toEqual('w')
      expect(getSide('black')).toEqual('b')
    })

    it('even given short name', () => {
      expect(getSide('w')).toEqual('w')
      expect(getSide('b')).toEqual('b')
    })
  })
})
