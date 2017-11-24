/**
 * Pawn moves 2 steps in front of initial
 * @param  {Array}  direction - axis list
 * @param  {String} name      - direction name
 * @param  {String} position  - current position
 * @return {Array}
 */
export function initDouble (direction, name, position) {
  const oneStepFurther = [0, 2] // axis
  let [first] = direction

  if (name === 'vertical' && /^.(2|7)$/.test(position)) {
    first = [...first, oneStepFurther]
  }

  return [first, direction.slice(1)]
}

// /**
//  * Pawn can attack with diagonal movement
//  * @return {Array}
//  */
// enPassant () {
//   // TODO need last notations
// },
//
// /**
//  * Pawn can promotion (queen only)
//  * @return {Array}
//  */
// promotion () {
//   // change piece
// },
//
// castling () {
//   //
// }
