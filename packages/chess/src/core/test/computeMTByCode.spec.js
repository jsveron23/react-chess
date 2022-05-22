import test from 'ava';
import computeMTByCode from '../computeMTByCode';

test('Should be returned empty array', (t) => {
  t.deepEqual(computeMTByCode(), []);
  t.deepEqual(computeMTByCode(''), []);
  t.deepEqual(computeMTByCode(3), []);
  t.deepEqual(computeMTByCode('a5wQ'), []);
});

test('Should be returned movable tiles', (t) => {
  t.deepEqual(computeMTByCode('wPa2'), ['a3']);
  t.deepEqual(computeMTByCode('wNg1'), ['f3', 'h3', 'e2']);
});
