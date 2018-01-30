import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getDefaults } from '@pieces'
import { isEmpty, isExist, push, getLastItem } from '@utils'
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
    setAxis: PropTypes.func,
    promotion: PropTypes.func,
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
    setAxis: function () {},
    promotion: function () {},
    resetMovable: function () {},
    resetMatch: function () {},
    revert: function () {}
  }

  constructor (props) {
    super(props)

    this.state = {
      check: '',
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
      // TODO reset until implement resume menu
      resetMatch()
    }

    if (command === 'undo' && isExist(records)) {
      const applyUndo = Chess.undo(records)
      const getPrevTurn = Chess.getEnemy

      this.setState({
        check: ''
      }, () => revert({
        applyUndo,
        getPrevTurn
      }))
    }
  }

  render () {
    const {
      isMoving,
      check,
      currPosition
    } = this.state
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
        isMoving={isMoving}
        notations={notations}
        movable={movable}
        check={check}
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
   * @see @utils/Chess/index.js#getMovable
   */
  handleSelect = (args) => {
    const {
      side,
      piece,
      position,
      defaults,
      specials
    } = args

    this.setState({
      currPosition: position
    }, () => {
      // const { check } = this.state
      const {
        notations,
        records,
        setMovable
      } = this.props

      // TODO if 'check' own king, do restrict of movable
      // console.log(check)

      const getMovable = Chess.getMovable(notations, records)(piece, position, side)
      const movable = getMovable(defaults, specials)

      setMovable(movable)
    })
  }

  /**
   * Handle move when click a square
   * @see @components#<File />
   * @see @utils/Chess/index.js#getNextNotations
   * @see @utils/Chess/index.js#saveRecords
   * @see @utils/Chess/index.js#getEnemy
   */
  handleMove = (nextPosition) => {
    const { currPosition } = this.state
    const {
      notations,
      records,
      setNext,
      resetMovable,
      setAxis
    } = this.props

    this.setState({
      isMoving: true,
      currPosition: ''
    }, () => {
      const getNextNotations = Chess.getNextNotations(currPosition, nextPosition)(setAxis)
      const getNextRecords = Chess.saveRecords(records, notations)(/* timestamp */)

      setNext({
        getNextTurn: Chess.getEnemy,
        getNextRecords,
        getNextNotations
      }).then(() => resetMovable())
    })
  }

  /**
   * Handle animation begin
   * @see @utils/Enhancer/piece.js#onAnimate
   */
  handleAnimate = (axis, el) => {
    const pretendMoving = (element) => (cssText) => () => (element.style.cssText = cssText)
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
    this.setState({
      isMoving: false
    }, () => {
      const {
        notations,
        records,
        turn,
        setNotations,
        setRecords
      } = this.props
      const { currPosition } = this.state
      const isAfterMoving = isEmpty(currPosition)

      if (isAfterMoving) {
        let nextNotations

        switch (piece) {
          case 'P': {
            nextNotations = Chess.promotion(notations)(records)

            if (isExist(nextNotations)) {
              setNotations(nextNotations)
            }

            break
          }

          case 'K': {
            // TODO castling
          }
        }

        nextNotations = nextNotations || [...notations]

        // is checked?
        const simulateCheck = Chess.simulateCheckKing(nextNotations, turn)(piece)
        const {
          isChecked,
          kingNotation
        } = simulateCheck(getDefaults)

        if (isChecked) {
          const [lastItem] = getLastItem(records)
          const enemyTurn = Chess.getEnemy(turn)
          const move = Chess.getMove(lastItem)(enemyTurn)

          // TODO why 2 times, find why later!! (1 clue - diagonal)
          if (!/\+/.test(move)) {
            const { black } = lastItem
            const side = isExist(black) ? 'black' : 'white'
            const log = lastItem[side]
            const addCheckMark = `${move}+`

            log.move = addCheckMark

            const changedRecords = push(records, lastItem, false)

            setRecords(changedRecords)
          }
        }

        console.log(piece)

        this.setState({
          check: isChecked ? kingNotation : ''
        })
      }
    })
  }
}

export default enhancer
