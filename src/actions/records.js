import * as types from '@constants'

/** Set records */
export function setRecords (records) {
  return {
    type: types.SET_RECORDS,
    payload: records
  }
}

/** Reset records */
export function resetRecords () {
  return {
    type: types.RESET_RECORDS
  }
}
