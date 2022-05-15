import test from 'ava';
import findCodeByTile from '../findCodeByTile';

// prettier-ignore
const Snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];

test('Should return function (curry)', (t) => {
  t.is(typeof findCodeByTile(), 'function');
  t.is(typeof findCodeByTile(null), 'function');
});

test('Should return empty string when given snapshot is not valid', (t) => {
  t.deepEqual(findCodeByTile([], 'd7'), '');
});

test('Should return single tile as string or undefined', (t) => {
  t.is(findCodeByTile(Snapshot, 'a2'), 'wPa2');
  t.is(findCodeByTile(Snapshot, 'a3'), undefined);
});
