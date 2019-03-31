import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as R from 'ramda'
import { Blank } from '~/components'
import { isEmpty, isExist, lazy, noop } from '~/utils'
import { detectDarkBg } from '~/chess/helper'
import { createElement } from '~/externals'
import css from './File.css'

const File = (props) => {
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

  const isMovable = movableTiles.includes(tile)

  function handleClick (evt) {
    evt.preventDefault()

    const shouldSetNextSnapshot = isEmpty(children) && isMovable

    if (shouldSetNextSnapshot) {
      setNextSnapshot(tile)
    }
  }

  const pieceProps = {
    turn,
    selectedKey,
    selectedTile,
    checkTo,
    tile,
    isMovable,
    animate,
    setNextCapturedSnapshot,
    setNextMovableAxis
  }

  const blankProps = {
    tagName: 'div',
    className: cx({ 'is-movable': isMovable })
  }

  const Element = R.compose(
    createElement(children || Blank),
    R.ifElse(isExist, lazy(pieceProps), lazy(blankProps))
  )(children)
  const cls = cx(css.file, { 'is-dark': detectDarkBg(tile) })

  return (
    <div className={cls} data-file={fileName} onClick={handleClick}>
      {Element}
    </div>
  )
}

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
