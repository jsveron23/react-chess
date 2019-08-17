import getMovement from '../getMovement'
import { MOVEMENTS } from '../../constants'

describe('#getMovement', () => {
  it('Get a movement of piece', () => {
    expect(getMovement('P')).toEqual(MOVEMENTS['P'])
    expect(getMovement('B')).toEqual(MOVEMENTS['B'])
    expect(getMovement('K')).toEqual(MOVEMENTS['K'])
    expect(getMovement('R')).toEqual(MOVEMENTS['R'])
  })
})
