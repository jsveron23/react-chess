import { test, expect } from 'bun:test';
import transformInto from '../transformInto';

test('Should return function (curry)', () => {
  expect(typeof transformInto()).toBe('function');
  expect(typeof transformInto(null)).toBe('function');
});

test('Should return transformed code', () => {
  expect(transformInto('Q', 'bPd5')).toEqual('bQd5');
});
