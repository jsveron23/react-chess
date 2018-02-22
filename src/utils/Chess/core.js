import * as Utils from '@utils'
import * as Helpers from './helpers'

/** Get movable tiles */
export function getMovable (notations, records = []) {
  return (piece, position, side) => (defaults, specials = []) => Utils.compose(
    Utils.diet,
    Utils.flatten,
    excludeBlocked(notations, side)(piece)(specials),
    includeSpecial(records, side)(piece, position)(specials),
    getPureMovableData(position, side)
  )(defaults)
}

/**
 * Get sight to predictable move of selected piece
 * @alias getMovable
 */
export const getSight = getMovable

/** Get sight by notation, movement */
export function getSightBy (notations, records = []) {
  const _getSight = getSight(notations, records)

  return (notation) => {
    const parsedNotation = Helpers.parseNotation(notation, true)

    return (movement) => _getSight(...parsedNotation)(...movement)
  }
}

/** Get common sights */
export function getCommonSights (notations, records) {
  /** @callback */
  const _getSightBy = getSightBy(notations, records)

  return (baseNotation, baseMovement) => (targetNotation, targetMovement) => {
    const baseSight = _getSightBy(baseNotation)(baseMovement)
    const targetSight = _getSightBy(targetNotation)(targetMovement)

    return Utils.intersection(baseSight)(targetSight)
  }
}

/** Get movable data from movement (before filtering) */
export function getPureMovableData (position, turn) {
  const { file, rank } = Helpers.parsePosition(position)
  const fileIdx = Helpers.getFileIdx(file)

  /** @callback */
  const _transform = (axisList) => axisList.reduce((tiles, axis) => {
    const [x, y] = axis

    // X: 1(a) + 1 = 2(b)
    const nextX = x + fileIdx

    // Y: upside down
    const nextY = turn === 'white'
      ? y + parseInt(rank, 10)
      : parseInt(rank, 10) - y

    const fileChar = Helpers.getFile(nextX) // it removes outside of board
    const isInside = (nextX > 0 && nextY > 0 && nextY < 9 && !!fileChar)

    return isInside ? [...tiles, `${fileChar}${nextY}`] : tiles
  }, [])

  /** @callback */
  const _iterateDirection = (direction) => direction.map(_transform)

  return (defaults) => Object.keys(defaults)
    .map((mvName) => defaults[mvName])
    .map(_iterateDirection)
}

/** Add special move to movable data */
export function includeSpecial (records, turn) {
  const lastItem = Utils.getLastItem(records)

  return (piece, position) => (specials) => {
    /** @callback */
    const _controlPawnSpecials = (m, mvName) => {
      switch (mvName) {
        case 'doubleStep': {
          const isFirstStep = /^.(2|7)$/.test(position)

          if (!isFirstStep) {
            return m
          }

          return doubleStep(turn)(m)
        }

        case 'enPassant': {
          if (Utils.isEmpty(lastItem)) {
            return m
          }

          return enPassant(lastItem)(position)(m)
        }

        default: {
          return m
        }
      }
    }

    return (movable) => {
      if (piece === 'P') {
        return movable.map((m) => specials.reduce(_controlPawnSpecials, m))
      } else if (piece === 'K') {
        // TODO castling
      }

      return movable
    }
  }
}

/** Filter blocked path to movable data (include enemy) */
export function excludeBlocked (notations, turn) {
  const apply = Utils.apply(notations)
  const [checkPlace, findNotation] = apply(Helpers.isThere, Helpers.findNotation)

  return (piece) => (specials) => {
    const cannotJump = specials.indexOf('jumpover') === -1

    return (movable) => movable.map((m) => {
      return m.map((tiles) => {
        let isBlocked = false
        let enemyTile = ''

        /** @callback */
        const _includeAvailable = (nonBlocked, tile) => {
          if (Utils.isEmpty(enemyTile)) {
            const { side, position } = Utils.compose(
              Helpers.parseNotation,
              findNotation
            )(tile)

            // 1 enemy per direction
            const isEnemy = Helpers.getEnemy(turn) === side
            const isEnemyExist = (
              piece !== 'P' && // Pawn cannot do forward attack
              !isBlocked && isEnemy &&
              Utils.isEmpty(enemyTile) && Utils.isExist(side)
            )

            if (isEnemyExist) {
              enemyTile = position
            }
          }

          const isPlaced = checkPlace(tile)
          const canJump = !cannotJump

          // everything except Knight
          const exceptKnight = isPlaced && !isBlocked && cannotJump

          // only for Knight
          const only4Knight = isPlaced && canJump

          // after blocked, remove leftover tiles (ignore)
          const afterBlocked = isBlocked

          if (exceptKnight || afterBlocked || only4Knight) {
            if (exceptKnight) {
              isBlocked = true
            }

            return nonBlocked
          }

          return [...nonBlocked, tile]
        }

        return tiles
          .reduce(_includeAvailable, [])
          .concat(enemyTile) // include enemy tile
      })
    })
  }
}

/** Promotion */
export function promotion (records) {
  const lastItem = Utils.getLastItem(records)
  const lastTurn = Helpers.detectLastTurn(lastItem)
  const move = Helpers.getMove(lastItem)(lastTurn)
  const { after } = Helpers.parseMove(move)
  const [x, y] = after.substr(-2, 2)
  const alias = Helpers.getAlias(lastTurn)
  const isEdge = /1|8/.test(y)

  return (notations) => {
    if (isEdge) {
      const updateNotations = Helpers.updateNotations(notations)
      const from = `${alias}P${x}${y}`
      const to = `${alias}Q${x}${y}`

      return updateNotations(from)(to)
    }
  }
}

/** Pawn moves 2 step forward */
export function doubleStep (turn) {
  /** @callback */
  const _updateRank = Helpers.updateRank(turn)

  return (m) => {
    const [tiles] = m
    const [tile] = tiles
    const oneMoreStep = _updateRank(tile)
    const mergedStep = Utils.push(tiles)(oneMoreStep)

    return [mergedStep]
  }
}

/**
 * Pawn moves diagonal and attack
 * TODO
 * - remove after move
 * - it won't work sometimes
 */
export function enPassant (lastItem) {
  const turn = Helpers.detectTurn(lastItem)
  const enemyMove = Utils.compose(
    Helpers.getMove(lastItem),
    Helpers.getEnemy,
    Helpers.detectTurn
  )(lastItem)
  const isPawn = enemyMove.substr(1, 1) === 'P'

  return (position) => {
    if (Utils.isEmpty(enemyMove) || !isPawn) {
      return (m) => m
    }

    // get myself
    const { file: myFile, rank: myRank } = Helpers.parsePosition(position)
    const myFileIdx = Helpers.getFileIdx(myFile)

    // get enemy
    const enemyPosition = enemyMove.substr(-2)
    const { file: enemyFile, rank: enemyRank } = Helpers.parsePosition(enemyPosition)
    const enemyFileIdx = Helpers.getFileIdx(enemyFile)

    // check
    const howManyLastStep = Helpers.countsVerticalStep(enemyMove)
    const isDoubleStep = howManyLastStep === 2
    const isSibling = Math.abs(myFileIdx - enemyFileIdx) === 1
    const isAdjustedLine = parseInt(myRank, 10) === parseInt(enemyRank, 10)

    return (m) => {
      // valid
      if (isDoubleStep && isAdjustedLine && isSibling) {
        const diagonal = Helpers.updateRank(turn)(enemyPosition)

        return [...m, [diagonal]]
      }

      return m
    }
  }
}
