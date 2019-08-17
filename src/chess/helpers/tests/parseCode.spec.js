import parseCode from '../parseCode'

describe('#parseCode', () => {
  it('Divides a code as single character', () => {
    const parsedCode = parseCode('bRa8')

    expect(parsedCode).toHaveProperty('piece', 'R')
    expect(parsedCode).toHaveProperty('side', 'b')
    expect(parsedCode).toHaveProperty('file', 'a')
    expect(parsedCode).toHaveProperty('rank', '8')
    expect(parsedCode).toHaveProperty('tile', 'a8')
    expect(parsedCode).toHaveProperty('code', 'bRa8')
  })
})
