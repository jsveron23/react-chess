import test from 'ava';
import detectDarkTile from '../detectDarkTile';

test('detectDarkTile - invalid code', (t) => {
  t.is(typeof detectDarkTile(), 'function');
});

test('detectDarkTile - valid code', (t) => {
  t.false(detectDarkTile('a', 2));
  t.true(detectDarkTile('a', 3));
});
