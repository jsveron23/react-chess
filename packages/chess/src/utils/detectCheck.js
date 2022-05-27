import { isEmpty } from 'ramda';

/**
 * Detect Check state
 * @param  {Object} check
 * @return {Object}
 */
function detectCheck(check) {
  if (!check) {
    throw new Error('invalid arguments');
  }

  const isStuck = isEmpty(check.defenders) && isEmpty(check.defendTiles);
  const isNotDodgeable = isEmpty(check.dodgeableTiles);
  const attackerCode = check.attackerCode || check.from;
  const isCheck = !!attackerCode;
  const isCheckmate = isCheck && isStuck && isNotDodgeable;
  // const isStalemate = !isCheck && isStuck && isNotDodgeable;

  return {
    isStalemate: false, // TODO for now
    isCheck,
    isCheckmate,
  };
}

export default detectCheck;
