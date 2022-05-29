import test from 'ava';
import createSheetData from '../createSheetData';

// TODO dodgeableTiles data wrong

// prettier-ignore
const Present = {
  turn: 'black',
  selectedCode: '',
  movableTiles: [],
  snapshot: [
    'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8', 'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
    'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2', 'wRa1', 'wNb1', 'wBc1', 'wQa4', 'wKe1', 'wBf1', 'wNg1', 'wRh1',
  ],
  checkData: {
    kingCode: 'bKe8',
    defenders: ['bNb8', 'bBc8', 'bQd8', 'bPb7', 'bPc7'],
    defendTiles: ['c6', 'd7', 'b5'],
    attackerCode: 'wQa4',
    attackerRoutes: ['d7', 'c6', 'b5', 'a4'],
    dodgeableTiles: ['bNb8', 'bBc8', 'bQd8', 'bPb7', 'bPc7'],
  },
};

// prettier-ignore
const Past = [
  {
    turn: 'white',
    selectedCode: '',
    movableTiles: [],
    snapshot: [
      'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8', 'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
      'wPa2', 'wPb2', 'wPc2', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2', 'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1',
    ],
    checkData: {
      kingCode: '',
      attackerCode: '',
      attackerRoutes: [],
      defenders: [],
      defendTiles: [],
      dodgeableTiles: [],
    },
  },
  {
    turn: 'black',
    selectedCode: '',
    movableTiles: [],
    snapshot: [
      'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8', 'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
      'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2', 'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1',
    ],
    checkData: {
      kingCode: '',
      attackerCode: '',
      attackerRoutes: [],
      defenders: [],
      defendTiles: [],
      dodgeableTiles: [
        'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
        'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
      ],
    },
  },
  {
    turn: 'white',
    selectedCode: '',
    movableTiles: [],
    snapshot: [
      'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8', 'bPa7', 'bPb7', 'bPc7', 'bPd5', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
      'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2', 'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1',
    ],
    checkData: {
      kingCode: '',
      attackerCode: '',
      attackerRoutes: [],
      defenders: [],
      defendTiles: [],
      dodgeableTiles: [
        'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
        'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1',
      ],
    },
  },
];

test('Should return function (curry)', (t) => {
  t.is(typeof createSheetData([]), 'function');
});

test('Should return notation list as array', (t) => {
  // prettier-ignore
  t.deepEqual(createSheetData(Present, Past), [
    {
      black: {
        checkData: {
          defendTiles: [],
          defenders: [],
          dodgeableTiles: [
            'wPa2', 'wPb2', 'wPc4', 'wPd2', 'wPe2', 'wPf2', 'wPg2', 'wPh2',
            'wRa1', 'wNb1', 'wBc1', 'wQd1', 'wKe1', 'wBf1', 'wNg1', 'wRh1',
          ],
          attackerCode: '',
          attackerRoutes: [],
          kingCode: '',
        },
        from: ['bPd7'],
        to: ['bPd5'],
      },
      white: {
        checkData: {
          defendTiles: [],
          defenders: [],
          dodgeableTiles: [
            'bRa8', 'bNb8', 'bBc8', 'bQd8', 'bKe8', 'bBf8', 'bNg8', 'bRh8',
            'bPa7', 'bPb7', 'bPc7', 'bPd7', 'bPe7', 'bPf7', 'bPg7', 'bPh7',
          ],
          attackerCode: '',
          attackerRoutes: [],
          kingCode: '',
        },
        from: ['wPc2'],
        to: ['wPc4'],
      },
    },
    {
      white: {
        checkData: {
          defendTiles: ['c6', 'd7', 'b5'],
          defenders: ['bNb8', 'bBc8', 'bQd8', 'bPb7', 'bPc7'],
          dodgeableTiles: ['bNb8', 'bBc8', 'bQd8', 'bPb7', 'bPc7'],
          attackerCode: 'wQa4',
          attackerRoutes: ['d7', 'c6', 'b5', 'a4'],
          kingCode: 'bKe8',
        },
        from: ['wQd1'],
        to: ['wQa4'],
      },
    },
  ]);
});
