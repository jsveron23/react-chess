import test from 'ava';
import getPromotionCode from '../getPromotionCode';

test('Should be returned function', (t) => {
  t.is(typeof getPromotionCode(), 'function');
  t.is(typeof getPromotionCode(null), 'function');
  t.is(typeof getPromotionCode(null, null), 'function');
});

test('Should be returned empty value', (t) => {
  t.is(getPromotionCode('Q', 'g7', 'w'), '');
  t.is(getPromotionCode('Q', 'c2', 'b'), '');
});

test('Should be returned Queen code', (t) => {
  t.is(getPromotionCode('Q', 'a8', 'w'), 'wQa8');
  t.is(getPromotionCode('Q', 'h1', 'b'), 'bQh1');
});
