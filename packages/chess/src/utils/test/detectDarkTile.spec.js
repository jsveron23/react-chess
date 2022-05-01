import test from 'ava';
import detectDarkTile from '../detectDarkTile';

test('detectDarkTile - invalid code', (t) => {
  t.is(typeof detectDarkTile(), 'function');
});

test('detectDarkTile - valid code', (t) => {
  t.false(detectDarkTile(2, 'a'));
  t.true(detectDarkTile(3, 'a'));
});
