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

// B16
test('Should be returned Rook code', () => {
  expect(getPromotionCode('R', 'a8', 'w')).toBe('wRa8');
  expect(getPromotionCode('R', 'h1', 'b')).toBe('bRh1');
});

// B17
test('Should be returned Bishop code', () => {
  expect(getPromotionCode('B', 'e8', 'w')).toBe('wBe8');
  expect(getPromotionCode('B', 'e1', 'b')).toBe('bBe1');
});

// B18
test('Should be returned Knight code', () => {
  expect(getPromotionCode('N', 'b8', 'w')).toBe('wNb8');
  expect(getPromotionCode('N', 'b1', 'b')).toBe('bNb1');
});
