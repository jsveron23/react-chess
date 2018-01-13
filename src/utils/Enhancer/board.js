import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, isExist } from '@utils'
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
    axis: PropTypes.object.isRequired,
    command: PropTypes.string,
    setNext: PropTypes.func,
    setNotations: PropTypes.func,
    setRecords: PropTypes.func,
    setMovable: PropTypes.func,
    setTurn: PropTypes.func,
    setAxis: PropTypes.func,
    doPromotion: PropTypes.func,
    resetMovable: PropTypes.func,
    resetMatch: PropTypes.func,
    revert: PropTypes.func
  }

  static defaultProps = {
    command: '',
    setNext: function () {},
    setNotations: function () {},
    setRecords: function () {},
    setMovable: function () {},
    setTurn: function () {},
    setAxis: function () {},
    doPromotion: function () {},
    resetMovable: function () {},
    resetMatch: function () {},
    revert: function () {}
  }

  constructor (props) {
    super(props)

    this.state = {
      currPosition: '',
      isMoving: false
    }

    this.rAFId = -1
  }

  componentWillUnmount () {
    this.cancelRAF()
  }

  componentWillReceiveProps (nextProps) {
    const {
      isPlaying,
      command,
      records,
      resetMatch,
      revert
    } = nextProps

    if (!isPlaying && isExist(records)) {
      // TODO reset until implement resume
      resetMatch()
    }

    if (command === 'undo') {
      const undo = Chess.undo
      const getPrevTurn = Chess.getEnemy

      revert({
        undo,
        getPrevTurn
      })
    }
  }

  render () {
    const { currPosition } = this.state
    const {
      isPlaying,
      notations,
      movable,
      turn,
      axis
    } = this.props

    if (!isPlaying) {
      return null
    }

    return (
      <WrappedComponent
        notations={notations}
        movable={movable}
        turn={turn}
        selected={currPosition}
        translated={axis}
        onSelect={this.handleSelect}
        onMove={this.handleMove}
        onAnimate={this.handleAnimate}
        onAnimateEnd={this.handleAnimateEnd}
      />
    )
  }

  /**
   * Cancel requestAnimationFrame
   */
  cancelRAF () {
    window.cancelAnimationFrame(this.rAFId)

    return Promise.resolve(this.rAFId)
  }

  /**
   * Handle drawing movable squares
   * @see @components#<File />
   * @see @utils/Chess/index.js#getRawMovableData
   * @see @utils/Chess/index.js#rejectBlockedMovableData
   */
  handleSelect = (args) => {
    const {
      side,
      piece,
      position,
      defaults,
      specials
    } = args

    const {
      notations,
      records,
      turn,
      setMovable
    } = this.props

    this.setState({
      currPosition: position
    }, () => {
      const getOriginalMovableData = Chess.getRawMovableData({
        side,
        piece,
        position,
        records
      })

      const getFilteredMovableData = Chess.rejectBlockedMovableData({
        notations,
        turn,
        specials
      })

      setMovable({
        getOriginalMovableData,
        getFilteredMovableData,
        defaults,
        specials
      })
    })
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
    const {
      notations,
      records,
      setNext,
      setAxis,
      resetMovable
    } = this.props

    this.setState({
      isMoving: true,
      currPosition: ''
    }, () => {
      const getNextNotations = Chess.transformNextNotations({
        setAxis,
        currPosition,
        nextPosition
      })

      const getNextRecords = Chess.records({
        records,
        notations
      })

      setNext({
        getNextTurn: Chess.getEnemy,
        getNextNotations,
        getNextRecords
      }).then(() => resetMovable())
    })
  }

  /**
   * Handle animation begin
   * @see @utils/Enhancer/piece.js#onAnimate
   */
  handleAnimate = (axis, el) => {
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

    // cancel before starting if already exist
    this.cancelRAF()

    this.rAFId = window.requestAnimationFrame(animateFn)
  }

  /**
   * Handle animation end
   * @see @utils/Enhancer/piece.js#onAnimateEnd
   */
  handleAnimateEnd = (piece) => {
    const { currPosition } = this.state
    const { doPromotion } = this.props
    const isAfterMoving = isEmpty(currPosition)

    this.setState({
      isMoving: false
    }, () => {
      if (isAfterMoving) {
        switch (piece) {
          case 'P': {
            const checkUpdate = (nextNotations) => (notation, idx) => (notation !== nextNotations[idx])
            const getMove = Chess.getMove
            const promotion = Chess.promotion

            doPromotion({
              checkUpdate,
              getMove,
              promotion
            })

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
