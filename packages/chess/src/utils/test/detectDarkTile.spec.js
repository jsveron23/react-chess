import test from 'ava';
import detectDarkTile from '../detectDarkTile';

test('detectDarkTile', (t) => {
  t.throws(() => detectDarkTile('', 2));
  t.throws(() => detectDarkTile('a', 0));
  t.false(detectDarkTile('a', 2));
  t.true(detectDarkTile('a', 3));
});
