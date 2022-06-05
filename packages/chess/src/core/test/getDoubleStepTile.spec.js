import test from 'ava';
import getDoubleStepTile from '../getDoubleStepTile';

// prettier-ignore
const snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQb4', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe5', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd4', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQc3', 'wKe1', 'wBf1', 'wNg1', 'wRh1',
];

test('Should be returned empty value', (t) => {
  t.is(getDoubleStepTile('wPa3', snapshot), '');
  t.is(getDoubleStepTile('bPh6', snapshot), '');
  t.is(getDoubleStepTile('wPc2', snapshot), '');
});

test('Should be returned a tile', (t) => {
  t.is(getDoubleStepTile('wPa2', snapshot), 'a4');
  t.is(getDoubleStepTile('bPh7', snapshot), 'h5');
});
