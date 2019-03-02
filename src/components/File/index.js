import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import memoize from 'memoize-one'
import { boundMethod } from 'autobind-decorator'
import {
  curry,
  compose,
  includes,
  ifElse,
  thunkify,
  identity,
  and
} from 'ramda'
import { Blank } from '~/components'
import { isEmpty, isExist, noop } from '~/utils'
import { isDarkBg } from '~/chess/helpers'
import css from './File.css'

const curriedCreateElement = curry((Element, props) =>
  createElement(Element, props)
)

class File extends Component {
  static propTypes = {
    turn: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    tile: PropTypes.string.isRequired,
    selectedPiece: PropTypes.string,
    selectedSide: PropTypes.string,
    selectedFile: PropTypes.string,
    selectedRank: PropTypes.string,
    movableTiles: PropTypes.array,
    children: PropTypes.func,
    setCapturedNext: PropTypes.func,
    setMovable: PropTypes.func,
    setNext: PropTypes.func
  }

  static defaultProps = {
    movableTiles: [],
    setCapturedNext: noop,
    setMovable: noop,
    setNext: noop
  }

  isMovable = memoize(includes)

  @boundMethod
  handleClick (evt) {
    evt.preventDefault()

    const { tile, children, movableTiles, setNext } = this.props
    const shouldSetNext = compose(
      and(isEmpty(children)),
      this.isMovable(tile)
    )(movableTiles)

    if (shouldSetNext) {
      setNext(tile)
    }
  }

  render () {
    const {
      turn,
      fileName,
      tile,
      children,
      selectedPiece,
      selectedSide,
      selectedFile,
      selectedRank,
      movableTiles,
      setCapturedNext,
      setMovable
    } = this.props

    const isMovable = this.isMovable(tile, movableTiles)

    const pieceProps = {
      turn,
      selectedPiece,
      selectedSide,
      selectedFile,
      selectedRank,
      tile,
      isMovable,
      setCapturedNext,
      setMovable
    }

    const blankProps = {
      tagName: 'div',
      className: cx({ 'is-movable': isMovable })
    }

    const Element = compose(
      curriedCreateElement(children || Blank),
      ifElse(
        isExist,
        thunkify(identity)(pieceProps),
        thunkify(identity)(blankProps)
      )
    )(children)
    const cls = cx(css.file, { 'is-dark': isDarkBg(tile) })

    return (
      <div className={cls} data-file={fileName} onClick={this.handleClick}>
        {Element}
      </div>
    )
  }
}

export default File
