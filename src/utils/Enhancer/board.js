import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from '@utils'
import Chess from '@utils/Chess'

/**
 * Control Tower of Chess
 * @param  {React.Component} WrappedComponent
 * @return {React.Component}
 */
const enhancer = (WrappedComponent) => class extends PureComponent {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    notations: PropTypes.array.isRequired,
    records: PropTypes.array.isRequired,
    movable: PropTypes.array.isRequired,
    turn: PropTypes.string.isRequired,
    command: PropTypes.string,
    setNext: PropTypes.func,
    setNotations: PropTypes.func,
    setRecords: PropTypes.func,
    setMovable: PropTypes.func,
    setTurn: PropTypes.func,
    resetMovable: PropTypes.func,
    revert: PropTypes.func
  }

  static defaultProps = {
    command: '',
    setNext: function () {},
    setNotations: function () {},
    setRecords: function () {},
    setMovable: function () {},
    setTurn: function () {},
    resetMovable: function () {},
    revert: function () {}
  }

  constructor (props) {
    super(props)

    this.state = {
      currPosition: '',
      isMoving: false
    }

    this.translated = null
    this.rAFId = -1
  }

  componentDidUpdate () {
    this.translated = null
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.rAFId)
  }

  componentWillReceiveProps (nextProps) {
    const {
      isPlaying,
      command,
      revert
    } = nextProps

    if (!isPlaying) {
      console.log('ISN\'T PLAYING!')
      // TODO set reset every thing
    }

    if (command === 'undo') {
      const undo = Chess.undo
      const getPrevTurn = Chess.getEnemy

      revert({ undo, getPrevTurn })
    }
  }

  render () {
    const { currPosition } = this.state
    const { isPlaying, notations, movable, turn } = this.props

    if (!isPlaying) {
      return null
    }

    return (
      <WrappedComponent
        notations={notations}
        movable={movable}
        turn={turn}
        translated={this.translated}
        selected={currPosition}
        onSelect={this.handleSelect}
        onAnimate={this.handleAnimateBegin}
        onMoveBegin={this.handleMove}
        onMoveEnd={this.handleAnimateEnd}
      />
    )
  }

  /**
   * Set calculated axis to create moving animation
   * @see @utils/Chess/index.js#transformNextNotations
   */
  setAxis = (prevNotation, nextNotation) => {
    const axis = Chess.convertAxis(prevNotation, nextNotation)

    // TODO
    // get rid of it if it fires side effect
    // re-implement
    // not good for understanding code flow
    this.translated = {
      notation: nextNotation,
      axis
    }
  }

  /**
   * Handle drawing movable squares
   * @see @components#<File />
   * @see @utils/Chess/index.js#getRawMovableData
   * @see @utils/Chess/index.js#rejectBlockedMovableData
   */
  handleSelect = ({ side, piece, position, defaults, specials }) => {
    const { notations, records, turn, setMovable } = this.props
    const getOriginalMovableData = Chess.getRawMovableData({ side, piece, position, records })
    const getFilteredMovableData = Chess.rejectBlockedMovableData({ notations, turn, specials })

    this.setState({
      currPosition: position
    }, () => setMovable({ getOriginalMovableData, getFilteredMovableData, defaults, specials }))
  }

  /**
   * Handle move when click a square
   * @see @components#<File />
   * @see @utils/Chess/index.js#transformNextNotations
   * @see @utils/Chess/index.js#records
   * @see @utils/Chess/index.js#getEnemy
   */
  handleMove = (nextPosition) => {
    const { currPosition } = this.state
    const { notations, records, setNext, resetMovable } = this.props
    const getNextNotations = Chess.transformNextNotations({ currPosition, nextPosition, cb: this.setAxis })
    const getNextRecords = Chess.records({ records, notations })
    const getNextTurn = Chess.getEnemy

    this.setState({
      isMoving: true,
      currPosition: ''
    }, () => {
      setNext({ getNextNotations, getNextRecords, getNextTurn })
        .then(() => resetMovable())
    })
  }

  /**
   * Handle animation begin
   * TODO performance up (only CSS)
   */
  handleAnimateBegin = (axis, el) => {
    const pretendMoving = (element) => (cssText) => (/* rAF */) => (element.style.cssText = cssText)
    const animateTo = pretendMoving(el)
    const animateFn = animateTo('top: 0; right: 0;')
    let style = ''

    if (axis.x !== 0) {
      style = `${style}right: ${axis.x}px;`
    }

    if (axis.y !== 0) {
      style = `${style}top: ${axis.y}px;`
    }

    el.style.cssText = style

    if (this.rAFId) {
      window.cancelAnimationFrame(this.rAFId)
    }

    this.rAFId = window.requestAnimationFrame(animateFn)
  }

  /**
   * Handle animation end
   */
  handleAnimateEnd = (piece) => {
    const { currPosition } = this.state
    const { notations, records, setNotations } = this.props
    const isAfterMoving = isEmpty(currPosition)
    const checkUpdate = (nextNotations) => (notation, idx) => (notation !== nextNotations[idx])

    this.setState({
      isMoving: false
    }, () => {
      if (isAfterMoving) {
        switch (piece) {
          case 'P': {
            const nextNotations = Chess.dispatch({
              type: 'PROMOTION',
              payload: { notations, records }
            })
            const isUpdated = checkUpdate(nextNotations)
            const isChanged = notations.some(isUpdated)

            isChanged && setNotations(nextNotations)

            break
          }

          case 'K': {
            // TODO castling
          }
        }
      }
    })
  }
}

export default enhancer
