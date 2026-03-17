import { test, expect } from 'bun:test';
import { getDirection } from '../get-direction';

test('Should be returned function', () => {
  expect(typeof getDirection()).toBe('function');
  expect(typeof getDirection(null)).toBe('function');
});

test('Should be returned no direction string', () => {
  expect(getDirection(2, 3)).toBe('');
  expect(getDirection(2, 5)).toBe('');
  expect(getDirection(6, 5)).toBe('');
});

test('Should be returned direction string', () => {
  expect(getDirection(0, 1)).toBe('Vertical');
  expect(getDirection(0, 2)).toBe('Vertical');
  expect(getDirection(0, 3)).toBe('Vertical');
  expect(getDirection(0, 4)).toBe('Vertical');
  expect(getDirection(1, 0)).toBe('Horizontal');
  expect(getDirection(2, 0)).toBe('Horizontal');
  expect(getDirection(3, 0)).toBe('Horizontal');
  expect(getDirection(4, 0)).toBe('Horizontal');
  expect(getDirection(1, 1)).toBe('Diagonal');
  expect(getDirection(2, 2)).toBe('Diagonal');
  expect(getDirection(3, 3)).toBe('Diagonal');
  expect(getDirection(4, 4)).toBe('Diagonal');
});
