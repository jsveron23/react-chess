import test from 'ava';
import detectTurn from '../detectTurn';

test('detectTurn - invalid code', (t) => {
  t.is(typeof detectTurn(), 'function');
});

test('detectTurn - valid code', (t) => {
  t.true(detectTurn('w', 'wPa2'));
  t.false(detectTurn('w', 'bPa7'));
  t.true(detectTurn('b', 'bPa7'));
  t.false(detectTurn('b', 'wPa2'));
});
