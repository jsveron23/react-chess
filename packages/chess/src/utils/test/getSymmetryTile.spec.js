import test from 'ava';
import getSymmetryTile from '../getSymmetryTile';

test('Should return function (curry)', (t) => {
  t.is(typeof getSymmetryTile(), 'function');
  t.is(typeof getSymmetryTile(null), 'function');
  t.is(typeof getSymmetryTile(null, null), 'function');
});

test('Should return falsy if given arguments is not correct', (t) => {
  t.falsy(getSymmetryTile('Vertical', 'wKe5', 'f4'));
});

test('Should return tile as string', (t) => {
  t.is(getSymmetryTile('Vertical', 'wKe2', 'e3'), 'e1');
  t.is(getSymmetryTile('Horizontal', 'wKe1', 'd1'), 'f1');
  t.is(getSymmetryTile('Diagonal', 'wKe5', 'f4'), 'd6');
});
