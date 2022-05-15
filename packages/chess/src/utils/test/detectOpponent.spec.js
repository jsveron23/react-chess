import test from 'ava';
import detectOpponent from '../detectOpponent';

test('Should return function (curry)', (t) => {
  t.is(typeof detectOpponent(), 'function');
  t.is(typeof detectOpponent(null), 'function');
});

test('Should return false value', (t) => {
  t.false(detectOpponent('', 'bPc4'));
  t.false(detectOpponent('bPc4', ''));
});

test('Should return boolean value', (t) => {
  t.true(detectOpponent('bRa8', 'wPc4'));
  t.false(detectOpponent('bRa8', 'bPc4'));
});
