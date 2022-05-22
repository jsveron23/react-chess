import test from 'ava';
import computeMTByDirection from '../computeMTByDirection';

// prettier-ignore
const snapshot = [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
    'bPa7', 'bPb7', 'bPc6', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
    'wRa1', 'wNb1', 'wBc1', 'wQa4', 'wKe1', 'wBf1', 'wNg1', 'wRh1'
];

test('Should be thrown errors', (t) => {
  t.throws(() => computeMTByDirection(snapshot, 'Pa2'));
  t.throws(() => computeMTByDirection({}, 'wPa2'));
  t.throws(() => computeMTByDirection(null, 'wPa2'));
});

test('Should be returned movable tiles that excludes blocked tiles', (t) => {
  // prettier-ignore
  t.deepEqual(
    computeMTByDirection(snapshot, 'wQc3').sort(),
    [
      'c4', 'b4', 'a5', 'b3', 'a3', 'b2', 'c2', 'c1', 'd2',
      'd3', 'e3', 'f3', 'g3', 'h3', 'd4', 'e5', 'f6', 'g7',
    ].sort()
  );

  // prettier-ignore
  t.deepEqual(
    computeMTByDirection(snapshot, 'wQa4').sort(),
    [
      'a5', 'a6', 'a7', 'b5', 'c6', 'b4',
      'c4', 'b3', 'c2', 'd1', 'a3', 'a2',
    ].sort()
  );
});
