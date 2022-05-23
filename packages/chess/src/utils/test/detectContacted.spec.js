import test from 'ava';
import detectContacted from '../detectContacted';

test('Should be returned function', (t) => {
  t.is(typeof detectContacted(), 'function');
  t.is(typeof detectContacted(null), 'function');
});

test('Should be returned whether contacted or not', (t) => {
  t.true(detectContacted(1, 1));
  t.true(detectContacted(1, 0));
  t.true(detectContacted(0, 1));
  t.false(detectContacted(3, 1));
  t.false(detectContacted(3, 3));
});
