/**
 * Set notations
 * @param {Array} notations
 */
export const setNotations = (notations) => ({
  type: 'SET_NOTATIONS',
  payload: notations
})

/**
 * Reset notations
 */
export const resetNotations = () => ({
  type: 'RESET_NOTATIONS'
})
