import { isEmpty } from 'ramda';

/**
 * Detect Check state
 * @param  {Object}   check
 * @param  {Function} detectStalemate
 * @return {Object}
 */
function detectCheck(check) {
  if (!check) {
    throw new Error('invalid arguments');
  }

  const isStuck = isEmpty(check.defenders) && isEmpty(check.defendTiles);
  const haveNotDodgeable = isEmpty(check.dodgeableTiles);
  const attackerCode = check.attackerCode || check.from;
  const isCheck = !!attackerCode;
  const isCheckmate = isCheck && isStuck && haveNotDodgeable;

  return {
    isCheck,
    isCheckmate,
  };
}

export default detectCheck;
