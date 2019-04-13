import { replaceKeys } from '~/utils'

describe('#replaceKeys', () => {
  const original = {
    Tony: 'first name',
    Jin: 'family name'
  }

  describe('Replace given keys from original keys', () => {
    test('simple conversion', () => {
      expect(replaceKeys({ Tony: 'Ip Myung' }, original)).toHaveProperty('Ip Myung', 'first name')

      expect(replaceKeys({ Jin: 'Jinn', Tony: 'Qui Gon' }, original)).toHaveProperty(
        'Jinn',
        'family name'
      )
    })

    test('replace duplicate to one', () => {
      expect(replaceKeys({ Tony: 'Jinn', Jin: 'Jinn' }, original)).toEqual({
        Jinn: 'family name'
      })
    })

    test('given useless data', () => {
      expect(replaceKeys({}, original)).toEqual(original)
      expect(replaceKeys([], original)).toEqual(original)
      expect(replaceKeys('', original)).toEqual(original)
      expect(replaceKeys(0, original)).toEqual(original)
    })
  })
})
