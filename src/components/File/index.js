import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as R from 'ramda'
import { Blank } from '~/components'
import { isEmpty, isExist, lazy, noop } from '~/utils'
import { detectDarkBg } from '~/chess/helpers'
import createElement from './createElement'
import css from './File.css'

const File = React.forwardRef(function File (props, ref) {
  const {
    turn,
    fileName,
    tile,
    children,
    selectedKey,
    selectedTile,
    checkTo,
    movableTiles,
    animate,
    setNextCapturedSnapshot,
    setNextMovableAxis,
    setNextSnapshot
  } = props

  const isMovable = useMemo(() => movableTiles.includes(tile), [movableTiles, tile])
  const isDark = useMemo(() => detectDarkBg(tile), [tile])
  const awaitCreateElement = useMemo(() => createElement(children || Blank), [children])
  const getElement = R.compose(
    awaitCreateElement,
    R.ifElse(
      isExist,
      lazy({
        turn,
        selectedKey,
        selectedTile,
        checkTo,
        tile,
        isMovable,
        animate,
        setNextCapturedSnapshot,
        setNextMovableAxis
      }),
      lazy({
        tagName: 'div',
        className: cx({ 'is-movable': isMovable })
      })
    )
  )

  const cls = cx(css.file, { 'is-dark': isDark })

  function handleClick (evt) {
    evt.preventDefault()

    const shouldSetNextSnapshot = isEmpty(children) && isMovable

    if (shouldSetNextSnapshot) {
      setNextSnapshot(tile)
    }
  }

  return (
    <div ref={ref} className={cls} data-file={fileName} onClick={handleClick}>
      {getElement(children)}
    </div>
  )
})

File.propTypes = {
  turn: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  tile: PropTypes.string.isRequired,
  selectedKey: PropTypes.string,
  selectedTile: PropTypes.string,
  checkTo: PropTypes.string,
  movableTiles: PropTypes.array,
  animate: PropTypes.object,
  children: PropTypes.func,
  setNextCapturedSnapshot: PropTypes.func,
  setNextMovableAxis: PropTypes.func,
  setNextSnapshot: PropTypes.func
}

File.defaultProps = {
  movableTiles: [],
  setNextCapturedSnapshot: noop,
  setNextMovableAxis: noop,
  setNextSnapshot: noop
}

export default File
