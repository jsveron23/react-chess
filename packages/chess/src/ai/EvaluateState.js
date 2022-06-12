import { getAttackers } from '../core';
import { parseCode } from '../utils';

const _toPKey = parseCode.prop('pKey');

class EvaluateState {
  static #Scores = {
    wP: 10,
    wN: 30,
    wB: 30,
    wR: 50,
    wQ: 90,
    wK: 900,
    bP: -10,
    bN: -30,
    bB: -30,
    bR: -50,
    bQ: -90,
    bK: -900,
  };

  /**
   * Evaluate state
   * @param  {Object} state
   * @return {Object} state + evaluated state
   */
  static #evaluateState(state) {
    const { node = [], pretendCode, isCaptured, timeline } = state;
    const [selectedCode, nextCode] = node;
    // let penalty = 0;
    let score = -1;

    // TODO not captured not why score 0
    if (isCaptured) {
      const selectedPKey = _toPKey(selectedCode);
      const pretendPKey = _toPKey(pretendCode);

      // TODO not perfect
      // TODO should be caluated before moving (timeline)
      const [attackerCode] = getAttackers(nextCode, timeline);

      // TODO better
      score = attackerCode
        ? 0
        : this.#Scores[pretendPKey] - this.#Scores[selectedPKey];
    }

    // TODO more

    return {
      ...state,
      score: score > -1 ? score : Math.floor(Math.random() * 5),
    };
  }

  static evaluateState(state) {
    return EvaluateState.#evaluateState(state);
  }
}

export default EvaluateState;
