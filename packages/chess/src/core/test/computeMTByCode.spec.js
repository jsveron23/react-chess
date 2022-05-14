import test from 'ava';
import computeMTByCode from '../computeMTByCode';

test('computeMTByCode - invalid code', (t) => {
  t.deepEqual(computeMTByCode(), []);
});

test('computeMTByCode - valid code', (t) => {
  t.deepEqual(computeMTByCode('wPa2'), ['a3']);
  t.deepEqual(computeMTByCode('wNg1'), ['f3', 'h3', 'e2']);
});
