import test from 'ava';
import validateCode from '../validateCode';

test('validateCode - invalid code', (t) => {
  t.false(validateCode());
  t.false(validateCode('wPa'));
  t.false(validateCode('aPa2'));
  t.false(validateCode('bAa2'));
  t.false(validateCode('bPj2'));
  t.false(validateCode('bPa9'));
});

test('validateCode - valid code', (t) => {
  t.true(validateCode('wPa2'));
});
