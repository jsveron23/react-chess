import test from 'ava';
import validateCode from '../validateCode';

test('validateCode', (t) => {
  t.false(validateCode());
  t.false(validateCode('wPa'));
  t.false(validateCode('aPa2'));
  t.false(validateCode('bAa2'));
  t.false(validateCode('bPj2'));
  t.false(validateCode('bPa9'));
  t.true(validateCode('wPa2'));
});
