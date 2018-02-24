import {
  isExist,
  isObject,
  isArray,
  isDiff,
  diff
} from '@utils'

/**
 * @param  {string}   mode
 * @return {Function}
 */
function processor (mode) {
  const _isBoolean = (v) => typeof v === 'boolean'
  const _isString = (v) => typeof v === 'string'
  const _isNumber = (v) => typeof v === 'number'

  return (prevProps, nextProps) => (res, key) => {
    let prevProp = prevProps[key]
    let nextProp = nextProps[key]
    let _isDiff

    if (_isBoolean(nextProp) || _isString(nextProp) || _isNumber(nextProp)) {
      _isDiff = prevProp !== nextProp
    }

    if (isObject(nextProp) || isArray(nextProp)) {
      _isDiff = isDiff(nextProp)(prevProp)

      if (isArray(nextProp)) {
        prevProp = diff(prevProp)(nextProp).join(', ')
        nextProp = diff(nextProp)(prevProp).join(', ')
      }
    }

    const shouldAppend = (
      mode === 'all' ||
      (mode === 'changed' && _isDiff) ||
      (mode === 'none' && !_isDiff)
    )

    return shouldAppend
      ? [{
        ...res[0],
        [key]: {
          state: _isDiff ? 'CHANGED' : 'NONE',
          prevProp,
          nextProp
        }
      }]
      : res
  }
}

/**
 * Display props on a table
 * @param  {Object}   options
 * @return {Function}
 */
export default function detect (options) {
  const {
    displayName = 'Noname',
    mode = 'all', // all, changed, none
    exclude = [],
    collapsed = false,
    conditions = () => true
  } = options

  return (prevProps) => (nextProps) => {
    const _reducer = processor(mode)(prevProps, nextProps)
    const _conditions = (key) => conditions(key, prevProps, nextProps) && !exclude.includes(key)

    return Object.keys(nextProps)
      .filter(_conditions)
      .reduce(_reducer, [{}])
      .forEach((result) => {
        if (isExist(result)) {
          if (collapsed) {
            console.groupCollapsed(displayName)
          } else {
            console.group(displayName)
          }

          console.table(result)
          console.groupEnd()
        }
      })
  }
}
