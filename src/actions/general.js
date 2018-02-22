import * as types from '@actions'

export function setAxis (axis) {
  return {
    type: types.SET_AXIS,
    payload: axis
  }
}

export function setScreen (screen) {
  return {
    type: types.SET_SCREEN,
    payload: screen
  }
}

export function setCommand (command) {
  return {
    type: types.SET_COMMAND,
    payload: command
  }
}

export function resetCommand () {
  return {
    type: types.RESET_COMMAND
  }
}

export function setTurn (turn) {
  return {
    type: types.SET_TURN,
    payload: turn
  }
}
