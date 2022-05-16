import test from 'ava';
import detectEnemyOnTiles from '../detectEnemyOnTiles';

test('Should return function (curry)', (t) => {
  t.is(typeof detectEnemyOnTiles(), 'function');
  t.is(typeof detectEnemyOnTiles(null, null), 'function');
  t.is(typeof detectEnemyOnTiles(null, null, null), 'function');
});

test('Should return boolean value', (t) => {
  t.true(
    detectEnemyOnTiles(
      [
        'a5',
        'a6',
        'a7',
        'a3',
        'a2',
        'b4',
        'c4',
        'b5',
        'c6',
        'd7',
        'b3',
        'c2',
        'd1',
      ],
      'wQa4',
      'bPa7',
      'a7'
    )
  );

  t.true(detectEnemyOnTiles(['a3', 'a4', 'b4'], 'wPa2', 'bPa4', 'b4'));
});
