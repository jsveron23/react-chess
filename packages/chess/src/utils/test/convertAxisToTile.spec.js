import test from 'ava';
import convertAxisToTile from '../convertAxisToTile';

test('convertAxisToTile', (t) => {
  t.throws(() => convertAxisToTile('wP7', [1, 2]));
  t.is(convertAxisToTile('wPa7', [1, 2]), '');
  t.is(convertAxisToTile('wPa2', [1, 1]), 'b3');
  t.is(convertAxisToTile('bPa7', [1, 1]), 'b6');
});
