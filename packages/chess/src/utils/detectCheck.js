import { isEmpty } from 'ramda';

function detectCheck(check) {
  const isStuck = isEmpty(check.defenders) && isEmpty(check.defendTiles);
  const isNotDodgeable = isEmpty(check.dodgeableTiles);
  const attackerCode = check.attackerCode || check.from;
  const isCheckmate = attackerCode && isStuck && isNotDodgeable;
  const isStalemate = !attackerCode && isStuck && isNotDodgeable;

  return {
    isCheckmate,
    isStalemate,
  };
}

export default detectCheck;
