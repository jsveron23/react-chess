import createSelected from '../createSelected'

describe('#createSelected', () => {
  describe('Create selected', () => {
    it('combine with -', () => {
      expect(createSelected('a7')('black')).toEqual('a7-b')
    })
  })
})
