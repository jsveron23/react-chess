import { test, expect } from 'bun:test';
import { parseCode } from '../parse-code';

test('Should return plain object if given code is not valid', () => {
  expect(parseCode()).toEqual({});
  expect(parseCode('Pa2')).toEqual({});
});

test('Should return object that parsed given code', () => {
  expect(parseCode('wPa2')).toEqual({
    pKey: 'wP',
    tileName: 'a2',
    code: 'wPa2',
    side: 'w',
    piece: 'P',
    fileName: 'a',
    rankName: '2',
  });
});
