import * as R from 'ramda'
import { ActionCreators } from 'redux-undo'
import { toggleMatchStatus } from '~/actions/general'
import { restartGame } from '~/actions/ingame'
import {
  RESUME_GAME,
  HUMAN_VS_HUMAN,
  HUMAN_VS_CPU,
  MAIN,
  UNDO,
  MESSAGE_RESTART_GAME
} from './constants'

const MAIN_ITEMS = [RESUME_GAME, HUMAN_VS_HUMAN, HUMAN_VS_CPU]

function mainItems (name) {
  switch (name) {
    case RESUME_GAME: {
      return [toggleMatchStatus()]
    }

    case HUMAN_VS_HUMAN: {
      const shouldRestart = window.confirm(MESSAGE_RESTART_GAME)

      if (!shouldRestart) {
        return []
      }

      return [
        restartGame(/* TODO: save */),
        ActionCreators.clearHistory(),
        toggleMatchStatus()
      ]
    }

    case HUMAN_VS_CPU:
    default: {
      return []
    }
  }
}

function gameItems (name) {
  switch (name) {
    case MAIN: {
      return [toggleMatchStatus()]
    }

    case UNDO: {
      return [ActionCreators.undo()]
    }
  }
}

export default function decideActions (name) {
  return R.ifElse(R.flip(R.includes)(MAIN_ITEMS), mainItems, gameItems)(name)
}
