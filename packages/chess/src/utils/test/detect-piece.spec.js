import { test, expect } from 'bun:test';
import { detectPiece } from '../detect-piece';

test('Should return function (curry)', () => {
  expect(typeof detectPiece()).toBe('function');
  expect(typeof detectPiece(null)).toBe('function');
});

test('Should return boolean value', () => {
  expect(detectPiece('R', 'wRc4')).toBe(true);
  expect(detectPiece('Q', 'bQc4')).toBe(true);
});
