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
    promotion: PropTypes.func,
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
    promotion: function () {},
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
      records,
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
      const applyUndo = Chess.undoRecord(records)
      const getPrevTurn = Chess.getEnemy

      this.setState({
        currPosition: '',
        isMoving: true,
        check: ''
      }, () => revert({
        applyUndo,
        getPrevTurn
      }).then(() => resetMovable()))
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

  /** Cancel requestAnimationFrame */
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
      const fns = {
        /**
         * Compare with between check and checker
         * to get direction that attacking path (common)
         */
        getAttackingRoute: (getCommonSights) =>
          getCommonSights(check, getMovement('*'))(checker, getMovement(checkerPiece))
      }
      const options = {
        isKing
      }

      // compare with between piece and piece
      const getBlocks = Chess.getBlocks(fns, options)(notations, records)
      const baseMovement = getMovement(checkerPiece)
      const targetNotation = `${Chess.getAlias(side)}${piece}${position}`
      const targetMovement = getMovement(piece)

      movable = getBlocks(checker, baseMovement)(targetNotation, targetMovement)
    } else {
      movable = getMovable(piece, position, side)(defaults, specials)
    }

    setMovable(movable)
  }

  /**
   * Handle drawing movable squares
   * @see @components#<File />
   * @see @utils/Chess/index.js#getMovable
   */
  handleSelect = (args) => this.setState(prevState => {
    const { position } = args

    return {
      currPosition: position
    }
  }, () => this.setSquares(args))

  /**
   * Handle move when click a square
   * @see @components#<File />
   * @see @utils/Chess/index.js#getNextNotations
   * @see @utils/Chess/index.js#saveRecords
   * @see @utils/Chess/index.js#getEnemy
   */
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
        records,
        setNext,
        resetMovable,
        setAxis
      } = this.props
      const getNextNotations = Chess.getNextNotations(currPosition, nextPosition)
      const getNextRecords = Chess.saveRecords(notations, records)

      setNext({
        getNextNotations: getNextNotations(setAxis),
        getNextTurn: Chess.getEnemy,
        getNextRecords
      }).then(resetMovable)
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
            nextNotations = Chess.promotion(notations)(records)

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
        const simulate = Chess.simulate(fns)
        const {
          isChecked,
          kingNotation,
          checkerNotation
        } = simulate(nextTurn, piece)({
          targetPiece: 'K',
          pretendPiece: 'Q',
          action: 'CHECK',
          initialValue: {
            isChecked: false,
            kingNotation: '',
            checkerNotation: ''
          }
        })

        if (isChecked) {
          const lastItem = Utils.getLastItem(records)
          const enemyTurn = Chess.getEnemy(nextTurn)
          const move = Chess.getMove(lastItem)(enemyTurn)

          // TODO
          // - why 2 times, find why later!!
          // - 1 clue : diagonal
          if (!/\+/.test(move)) {
            const { black } = lastItem
            const side = Utils.isExist(black) ? 'black' : 'white'
            const log = lastItem[side]
            const addCheckMark = `${move}+`

            log.move = addCheckMark

            const changedRecords = Utils.push(records)(lastItem, false)

            setRecords(changedRecords)
          }
        }

        this.setState({
          check: isChecked ? kingNotation : '',
          checker: isChecked ? checkerNotation : ''
        })
      }
    })
  }
}

export default enhancer
