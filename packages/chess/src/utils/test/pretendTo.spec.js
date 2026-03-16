import { test, expect } from 'bun:test';
import pretendTo from '../pretendTo';

test('Should return function (curry)', () => {
  expect(typeof pretendTo()).toBe('function');
  expect(typeof pretendTo(null)).toBe('function');
});

test('Should return transformed code', () => {
  expect(pretendTo('bRa8', 'bNb8')).toEqual('bNa8');
});
