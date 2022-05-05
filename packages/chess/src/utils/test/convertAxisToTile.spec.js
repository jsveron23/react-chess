import test from 'ava';
import convertAxisToTile from '../convertAxisToTile';

test('convertAxisToTile - invalid code', (t) => {
  t.is(typeof convertAxisToTile(), 'function');
  t.is(typeof convertAxisToTile('wPa2'), 'function');
  t.is(convertAxisToTile('wPa7', [1, 2]), '');
});

test('convertAxisToTile - valid code', (t) => {
  t.is(convertAxisToTile('wPa2', [1, 1]), 'b3');
  t.is(convertAxisToTile('bPa7', [1, 1]), 'b6');
});
