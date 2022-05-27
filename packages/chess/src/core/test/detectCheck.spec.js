import test from 'ava';
import detectCheck from '../detectCheck';

test('Should throw Error', (t) => {
  t.throws(() => detectCheck(), {
    instanceOf: Error,
  });
});

test('Should return Check state', (t) => {
  t.deepEqual(
    detectCheck({
      to: '',
      from: '',
      routes: [],
      defenders: [],
      defendTiles: [],
      dodgeableTiles: [],
    }),
    {
      isCheck: false,
      isCheckmate: false,
      isStalemate: true,
    }
  );

  t.deepEqual(
    detectCheck({
      to: '',
      from: 'wQe7',
      routes: [],
      defenders: [],
      defendTiles: [],
      dodgeableTiles: [],
    }),
    {
      isCheck: true,
      isCheckmate: true,
      isStalemate: false,
    }
  );

  t.deepEqual(
    detectCheck({
      to: '',
      from: '',
      routes: [],
      defenders: [],
      defendTiles: [],
      dodgeableTiles: [
        'bRa8',
        'bNb8',
        'bBc8',
        'bQd8',
        'bKe8',
        'bBf8',
        'bNg8',
        'bRh8',
        'bPa7',
        'bPb7',
        'bPc7',
        'bPd7',
        'bPe7',
        'bPf7',
        'bPg7',
        'bPh7',
      ],
    }),
    {
      isCheck: false,
      isCheckmate: false,
      isStalemate: false,
    }
  );

  t.deepEqual(
    detectCheck({
      to: 'bKe8',
      from: 'wQa4',
      routes: ['d7', 'c6', 'b5', 'a4'],
      defenders: ['bNb8', 'bBc8', 'bQd8', 'bPb7', 'bPc7'],
      defendTiles: ['c6', 'd7', 'b5'],
      dodgeableTiles: ['bNb8', 'bBc8', 'bQd8', 'bPb7', 'bPc7'],
    }),
    {
      isCheck: true,
      isCheckmate: false,
      isStalemate: false,
    }
  );
});
