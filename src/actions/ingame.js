import { compose, prop as extract } from 'ramda'
import * as types from '~/actions'
import { ENEMY } from '~/chess/constants'
import { getMovableAxis, getNextLineup, computeSpecial } from '~/chess/core'
import { getSpecial, parseSelected } from '~/chess/helpers'
import { isExist } from '~/utils'

export function setSelected (piece) {
  return {
    type: types.SET_SELECTED,
    payload: piece || ''
  }
}

export function setMovableAxis (movable) {
  return {
    type: types.SET_MOVABLE_AXIS,
    payload: movable || []
  }
}

export function toggleTurn () {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame
    const { turn } = present

    dispatch({
      type: types.TOGGLE_TURN,
      payload: ENEMY[turn]
    })
  }
}

export function setLineup (lineup) {
  return {
    type: types.SET_LINEUP,
    payload: lineup
  }
}

export function setMovable ({ tile, staticTurn, piece }) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame
    const { turn } = present
    const selected = `${tile}-${staticTurn}`
    const movableAxis = getMovableAxis(tile, piece, turn)

    dispatch(setSelected(selected))
    dispatch(setMovableAxis(movableAxis))
  }
}

export function setNext (tile) {
  return (dispatch, getState) => {
    const { ingame } = getState()
    const { present } = ingame
    const { selected, lineup, movableAxis } = present
    const { piece, side } = parseSelected(selected, lineup)
    const special = getSpecial(piece)
    let nextLineup = getNextLineup(selected, tile, lineup)

    if (isExist(special)) {
      nextLineup = compose(
        extract('lineup'),
        computeSpecial(side, special, tile, nextLineup)
      )(movableAxis)
    }

    dispatch(setLineup(nextLineup))
    dispatch(setMovableAxis())
    dispatch(toggleTurn())
  }
}
