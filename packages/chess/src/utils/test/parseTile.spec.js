import { test, expect } from 'bun:test';
import parseTile from '../parseTile';

test('Should return object that parsed given tile', () => {
  expect(parseTile('a2')).toEqual({
    tileName: 'a2',
    fileName: 'a',
    rankName: '2',
  });
});
