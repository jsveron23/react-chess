import { test, expect } from 'bun:test';
import detectOpponent from '../detectOpponent';

test('Should return function (curry)', () => {
  expect(typeof detectOpponent()).toBe('function');
  expect(typeof detectOpponent(null)).toBe('function');
});

test('Should return false value', () => {
  expect(detectOpponent('', 'bPc4')).toBe(false);
  expect(detectOpponent('bPc4', '')).toBe(false);
});

test('Should return boolean value', () => {
  expect(detectOpponent('bRa8', 'wPc4')).toBe(true);
  expect(detectOpponent('bRa8', 'bPc4')).toBe(false);
});
