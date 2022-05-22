import test from 'ava';
import getDoubleStepTile from '../getDoubleStepTile';

test('Should be returned empty value', (t) => {
  t.is(getDoubleStepTile('wPa3'), '');
  t.is(getDoubleStepTile('bPh6'), '');
});

test('Should be returned a tile', (t) => {
  t.is(getDoubleStepTile('wPa2'), 'a4');
  t.is(getDoubleStepTile('bPh7'), 'h5');
});
