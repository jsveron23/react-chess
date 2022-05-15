import test from 'ava';
import convertCodeToTile from '../convertCodeToTile';

test('Should return empty string when given code is not valid', (t) => {
  t.is(convertCodeToTile('ba8'), '');
});

test('Should return tile as string', (t) => {
  t.is(convertCodeToTile('bRa8'), 'a8');
  t.is(convertCodeToTile('wNg1'), 'g1');
});
