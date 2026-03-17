import { test, expect } from 'bun:test';
import { computeDistance } from '../compute-distance';

test('Should throw TypeError', () => {
  expect(() => computeDistance('', '')).toThrow();
  expect(() => computeDistance('abc', '')).toThrow();
  expect(() => computeDistance('abc', 'def')).toThrow();
  expect(() => computeDistance('abc', 'def')).toThrow();
});

test('Should return function (curry)', () => {
  expect(typeof computeDistance('')).toBe('function');
  expect(typeof computeDistance('abc')).toBe('function');
});

test('Should return object of distance data', () => {
  expect(computeDistance('wKa2', 'bQa8')).toEqual({
    rank: 6,
    file: 0,
  });

  expect(computeDistance('wKa2', 'bQa3')).toEqual({
    rank: 1,
    file: 0,
  });
});
