import { isEmpty } from 'ramda';

function detectCheck(check) {
  if (!check) {
    throw new Error('invalid arguments');
  }

  const isStuck = isEmpty(check.defenders) && isEmpty(check.defendTiles);
  const isNotDodgeable = isEmpty(check.dodgeableTiles);
  const attackerCode = check.attackerCode || check.from;
  const isCheck = !!attackerCode;
  const isCheckmate = isCheck && isStuck && isNotDodgeable;
  const isStalemate = !isCheck && isStuck && isNotDodgeable;

  return {
    isCheck,
    isCheckmate,
    isStalemate,
  };
}

export default detectCheck;
