import test from 'ava';
import getPKeyByTile from '../getPKeyByTile';

// prettier-ignore
const Snapshot = [
  'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
  'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
  'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
  'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];

test('Should return function (curry)', (t) => {
  t.is(typeof getPKeyByTile(), 'function');
  t.is(typeof getPKeyByTile(null), 'function');
});

test('Should return falsy value if given tile is not in snapshot', (t) => {
  t.falsy(getPKeyByTile(Snapshot, 'd4'));
});

test('Should return pKey', (t) => {
  t.is(getPKeyByTile(Snapshot, 'd1'), 'wQ');
});
