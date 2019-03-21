import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import memoize from 'memoize-one'
import { boundMethod } from 'autobind-decorator'
import * as R from 'ramda'
import { Blank } from '~/components'
import { isEmpty, isExist, lazy, noop } from '~/utils'
import { detectDarkBg } from '~/chess/helpers'
import css from './File.css'

// NOTE: ignore third arg
const curriedCreateElement = R.curry((Element, props) =>
  createElement(Element, props)
)

class File extends Component {
  static propTypes = {
    turn: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    tile: PropTypes.string.isRequired,
    selectedKey: PropTypes.string,
    selectedTile: PropTypes.string,
    checkTo: PropTypes.string,
    movableTiles: PropTypes.array,
    children: PropTypes.func,
    setNextCapturedSnapshot: PropTypes.func,
    setNextMovableAxis: PropTypes.func,
    setNextSnapshot: PropTypes.func
  }

  static defaultProps = {
    movableTiles: [],
    setNextCapturedSnapshot: noop,
    setNextMovableAxis: noop,
    setNextSnapshot: noop
  }

  isMemoizeMovable = memoize(R.includes, R.equals)

  @boundMethod
  handleClick (evt) {
    evt.preventDefault()

    const { tile, children, movableTiles, setNextSnapshot } = this.props
    const shouldSetNextSnapshot = R.compose(
      R.and(isEmpty(children)),
      this.isMemoizeMovable(tile)
    )(movableTiles)

    if (shouldSetNextSnapshot) {
      setNextSnapshot(tile)
    }
  }

  render () {
    const {
      turn,
      fileName,
      tile,
      children,
      selectedKey,
      selectedTile,
      checkTo,
      movableTiles,
      setNextCapturedSnapshot,
      setNextMovableAxis
    } = this.props

    const isMovable = this.isMemoizeMovable(tile, movableTiles)

    const pieceProps = {
      turn,
      selectedKey,
      selectedTile,
      checkTo,
      tile,
      isMovable,
      setNextCapturedSnapshot,
      setNextMovableAxis
    }

    const blankProps = {
      tagName: 'div',
      className: cx({ 'is-movable': isMovable })
    }

    const Element = R.compose(
      curriedCreateElement(children || Blank),
      R.ifElse(isExist, lazy(pieceProps), lazy(blankProps))
    )(children)
    const cls = cx(css.file, { 'is-dark': detectDarkBg(tile) })

    return (
      <div className={cls} data-file={fileName} onClick={this.handleClick}>
        {Element}
      </div>
    )
  }
}

export default File
