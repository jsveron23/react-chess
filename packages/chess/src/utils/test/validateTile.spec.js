import test from 'ava';
import validateTile from '../validateTile';

test('validateTile', (t) => {
  t.is(typeof validateTile(), 'function');
  t.false(validateTile('j', 1));
  t.false(validateTile('a', 9));
  t.true(validateTile('a', 1));
});
