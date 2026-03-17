import { test, expect } from 'bun:test';
import { detectTurn } from '../detect-turn';

test('Should throw TypeError', () => {
  expect(() => detectTurn('w', 'Pa2')).toThrow(TypeError);
});

test('Should return boolean value', () => {
  expect(detectTurn('white', 'wPa2')).toBe(true);
  expect(detectTurn('white', 'bPa7')).toBe(false);
  expect(detectTurn('black', 'bPa7')).toBe(true);
  expect(detectTurn('black', 'wPa2')).toBe(false);
});
