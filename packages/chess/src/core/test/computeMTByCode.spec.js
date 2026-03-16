import { test, expect } from 'bun:test';
import computeMTByCode from '../computeMTByCode';

test('Should be returned empty array', () => {
  expect(computeMTByCode()).toEqual([]);
  expect(computeMTByCode('')).toEqual([]);
  expect(computeMTByCode(3)).toEqual([]);
  expect(computeMTByCode('a5wQ')).toEqual([]);
});

test('Should be returned movable tiles', () => {
  expect(computeMTByCode('wPa2')).toEqual(['a3']);
  expect(computeMTByCode('wNg1')).toEqual(['f3', 'h3', 'e2']);
});
