import test from 'ava';
import validateTile from '../validateTile';

test('validateTile - invalid code', (t) => {
  t.is(typeof validateTile(), 'function');
  t.false(validateTile('j', 1));
  t.false(validateTile('a', 9));
});

test('validateTile - valid code', (t) => {
  t.true(validateTile('a', 1));
});
