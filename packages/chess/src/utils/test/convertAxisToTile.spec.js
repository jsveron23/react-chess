import test from 'ava';
import convertAxisToTile from '../convertAxisToTile';

test('Should return function (curry)', (t) => {
  t.is(typeof convertAxisToTile(''), 'function');
  t.is(typeof convertAxisToTile('wPa2'), 'function');
});

test('Should return empty string when given code is not valid', (t) => {
  t.is(convertAxisToTile('wa7', [1, 2]), '');
});

test('Should return empty string when given axis is outside of diagram', (t) => {
  t.is(convertAxisToTile('wPa7', [1, 2]), '');
});

test('Should return tile as string', (t) => {
  t.is(convertAxisToTile('wPa2', [1, 1]), 'b3');
  t.is(convertAxisToTile('bPa7', [1, 1]), 'b6');
});
