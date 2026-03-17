import { test, expect } from 'bun:test';
import { getPromotionCode } from '../get-promotion-code';

test('Should be returned function', () => {
  expect(typeof getPromotionCode()).toBe('function');
  expect(typeof getPromotionCode(null)).toBe('function');
  expect(typeof getPromotionCode(null, null)).toBe('function');
});

test('Should be returned empty value', () => {
  expect(getPromotionCode('Q', 'g7', 'w')).toBe('');
  expect(getPromotionCode('Q', 'c2', 'b')).toBe('');
});

test('Should be returned Queen code', () => {
  expect(getPromotionCode('Q', 'a8', 'w')).toBe('wQa8');
  expect(getPromotionCode('Q', 'h1', 'b')).toBe('bQh1');
});
