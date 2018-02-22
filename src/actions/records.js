import * as types from '@actions'

export function setRecords (records) {
  return {
    type: types.SET_RECORDS,
    payload: records
  }
}

export function resetRecords () {
  return {
    type: types.RESET_RECORDS
  }
}
