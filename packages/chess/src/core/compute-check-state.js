import {
  curry,
  compose,
  props,
  head,
  union,
  flatten,
  map,
  isEmpty,
} from 'ramda';
import { computePossibleMT } from './compute-possible-mt';
import { getAttackerRoutes } from './get-attacker-routes';
import { getAttackers } from './get-attackers';
import { getDefenders } from './get-defenders';
import {
  findOpponentKing,
  pretendTo,
  detectPiece,
  removeDirection,
  filterOpponent,
} from '../utils';

/**
 * Compute whether Check or not (entry function)
 * @param  {String} opponentCode after moved
 * @param  {Array}  timeline
 * @return {Object}
 */
function computeCheckState(opponentCode, timeline) {
  const kingCode = compose(findOpponentKing(opponentCode), head)(timeline);
  const attackerCodes = getAttackers(kingCode, timeline);
  const attackerCode = head(attackerCodes) || ''; // one is enough
  const onlyOneAttacker = attackerCodes.length === 1;
  let attackerRoutes = [];
  let defenders = [];
  let defendTiles = [];
  let kingMt = [];

  if (attackerCode) {
    // get all routes
    attackerRoutes = attackerCodes.reduce((acc, code) => {
      return compose(
        union(acc),
        getAttackerRoutes(timeline, code),
        pretendTo(kingCode)
      )(code);
    }, []);

    // defenders of King
    if (onlyOneAttacker) {
      [defenders, defendTiles] = compose(
        props(['of', 'tiles']),
        getDefenders(attackerCode, timeline)
      )(attackerRoutes);
    }
  }

  // TODO change name
  // all King side pieces movable tiles (+King)
  // NOTE hasAnyMove tracks all legal moves (incl. pawn forward) for stalemate detection.
  // dodgeableTiles strips pawn vertical moves because pawns only *attack* diagonally,
  // but a pawn moving forward is still a legal move that prevents stalemate.
  let hasAnyMove = false;
  const dodgeableTiles = compose(
    flatten,
    map((code) => {
      const allPmt = computePossibleMT(
        attackerCode,
        attackerRoutes,
        code,
        timeline
      );

      if (!isEmpty(allPmt)) {
        hasAnyMove = true;
      }

      let pmt = allPmt;

      if (detectPiece.Pawn(code)) {
        pmt = removeDirection.Vertical(pmt, code);
      }

      if (detectPiece.King(code)) {
        kingMt = pmt;
      }

      return pmt;
    }),
    filterOpponent(opponentCode),
    head
  )(timeline);

  const isStuck = isEmpty(defenders) && isEmpty(defendTiles);
  const isCheck = !!attackerCode;
  const isStalemate = !isCheck && !hasAnyMove;
  const isCheckmate = isCheck && isStuck && isEmpty(kingMt);

  return {
    isCheck,
    isStalemate,
    isCheckmate,

    // data for renderer
    data: {
      kingCode,
      defenders,
      defendTiles,
      attackerCode,
      attackerRoutes,
      dodgeableTiles,
    },
  };
}

const computeCheckStateCurried = curry(computeCheckState);
export { computeCheckStateCurried as computeCheckState };
