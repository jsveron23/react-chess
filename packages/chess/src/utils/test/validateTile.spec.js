import test from 'ava';
import validateTile from '../validateTile';

test('Should return function (curry)', (t) => {
  t.is(typeof validateTile(), 'function');
  t.is(typeof validateTile(null), 'function');
});

test('Should return false', (t) => {
  t.false(validateTile('j', 1));
  t.false(validateTile('a', 9));
});

test('Should return validate result', (t) => {
  t.true(validateTile('a', 1));
});
