import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getMovement } from '@pieces'
import * as Utils from '@utils'
import Chess from '@utils/Chess'

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
    resetMovable: PropTypes.func,
    resetMatch: PropTypes.func,
    resetCommand: PropTypes.func,
    revert: PropTypes.func
  }

  static defaultProps = {
    command: '',
    setNext: function () {},
    setNotations: function () {},
    setRecords: function () {},
    setMovable: function () {},
    setAxis: function () {},
    resetMovable: function () {},
    resetMatch: function () {},
    resetCommand: function () {},
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
      notations,
      records,
      turn,
      resetMatch,
      revert,
      resetMovable,
      resetCommand
    } = nextProps

    if (!isPlaying && Utils.isExist(records)) {
      // TODO reset until implement resume menu
      resetMatch()
    }

    if (command === 'undo' && Utils.isExist(records)) {
      const applyUndo = Chess.undoRecord(/* TODO options */)
      const getPrevTurn = Chess.getEnemy
      const fns = {
        applyUndo,
        getPrevTurn
      }

      this.setState({
        currPosition: '',
        isMoving: true,
        check: ''
      }, () => revert(fns)({ notations, records, turn }).then(resetMovable))
    }

    if (command === 'undo' && Utils.isEmpty(records)) {
      resetCommand()
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

  cancelRAF () {
    window.cancelAnimationFrame(this.rAFId)

    return Promise.resolve(this.rAFId)
  }

  setSquares = (args) => {
    const {
      side,
      piece,
      position,
      defaults,
      specials
    } = args
    const {
      check,
      checker
    } = this.state
    const {
      notations,
      records,
      setMovable
    } = this.props
    const getMovable = Chess.getMovable(notations, records)
    let movable

    // TODO
    // - King should not be moving to next checkable tile (need to predict next move)
    // - Knight cannot check King currently
    // - like behind, see screenshot
    // - FINAL: if checked, simulate own pieces movement to block attacked or lose
    if (Utils.isExist(check)) {
      const isKing = piece === 'K'
      const checkerPiece = checker.substr(1, 1)
      const baseMovement = getMovement(checkerPiece)
      // const { position: basePosition } = Chess.parseNotation(checker) .concat(basePosition)
      const fns = {
        /**
         * Compare with between check and checker
         * to get direction that attacking path (common)
         */
        getAttackingRoute: (getCommonSights) =>
          getCommonSights(check, getMovement('*'))(checker, baseMovement)
      }

      // compare with between piece and piece
      const options = { isKing, fns }
      const getBlocks = Chess.getBlocks(options)(notations)(records)
      const targetNotation = `${Chess.getAlias(side)}${piece}${position}`
      const targetMovement = getMovement(piece)

      movable = getBlocks(checker, baseMovement)(targetNotation, targetMovement)
    } else {
      movable = getMovable(piece, position, side)(defaults, specials)
    }

    setMovable(movable)
  }

  handleSelect = (args) => this.setState(prevState => {
    const { position } = args

    return {
      currPosition: position
    }
  }, () => this.setSquares(args))

  handleMove = (nextPosition) => {
    const { currPosition } = this.state

    this.setState({
      isMoving: true,
      currPosition: '',
      check: '',
      checker: ''
    }, () => {
      const {
        notations,
        turn,
        records,
        setNext,
        resetMovable,
        setAxis
      } = this.props
      const getNextNotations = Chess.getNextNotations({ setAxis })
      const getNextRecords = Chess.saveRecords(/* TODO options */)(notations)(records)
      const fns = {
        getNextNotations: getNextNotations(currPosition, nextPosition),
        getNextTurn: Chess.getEnemy,
        getNextRecords
      }

      setNext(fns)({ turn, notations })
        .then(resetMovable)
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

  handleAnimateEnd = (piece) => {
    const {
      turn: nextTurn,
      notations,
      records,
      setNotations,
      setRecords
    } = this.props
    const { currPosition } = this.state
    const isAfterMoving = Utils.isEmpty(currPosition)

    if (isAfterMoving) {
      let nextNotations

      switch (piece) {
        case 'P': {
          nextNotations = Chess.promotion(records)(notations)

          if (Utils.isExist(nextNotations)) {
            setNotations(nextNotations)
          }

          break
        }

        case 'K': {
          // TODO castling
        }
      }

      nextNotations = nextNotations || [...notations]

      // is your King checked?
      const stream = Utils.apply(nextNotations)(Chess.getMovable, Chess.findNotation)
      const fns = stream.reduce((getMovable, findNotation) => ({
        getMovement,
        getMovable,
        findNotation
      }))
      const simulate = Chess.simulate({
        targetPiece: 'K',
        pretendPiece: 'Q',
        action: 'CHECK',
        initialValue: {
          isChecked: false,
          kingNotation: '',
          checkerNotation: ''
        },
        fns
      })
      const {
        isChecked,
        kingNotation,
        checkerNotation
      } = simulate(nextTurn)(piece)

      if (isChecked) {
        const _push = Utils.push(records)
        const lastItem = Utils.getLastItem(records)
        const enemyTurn = Chess.getEnemy(nextTurn)
        const move = Chess.getMove(lastItem)(enemyTurn)
        const { black } = lastItem
        const side = Utils.isExist(black) ? 'black' : 'white'
        const log = lastItem[side]

        log.move = `${move}+`

        setRecords(_push(lastItem, false))
      }

      this.setState({
        isMoving: false,
        check: isChecked ? kingNotation : '',
        checker: isChecked ? checkerNotation : ''
      })
    }
  }
}

export default enhancer
