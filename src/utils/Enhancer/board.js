import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  getDefaults,
  getSpecials
} from '@pieces'
import {
  isEmpty,
  isExist,
  push,
  getLastItem,
  stream,
  intersection,
  commonArg
} from '@utils'
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
      resetCommand
    } = nextProps

    if (!isPlaying && isExist(records)) {
      // TODO reset until implement resume menu
      resetMatch()
    }

    if (command === 'undo' && isExist(records)) {
      const applyUndo = Chess.undo(records)
      const getPrevTurn = Chess.getEnemy

      this.setState({
        isMoving: true,
        check: ''
      }, () => revert({
        applyUndo,
        getPrevTurn
      }))
    } else if (command === 'undo' && isEmpty(records)) {
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

  /**
   * Cancel requestAnimationFrame
   */
  cancelRAF () {
    window.cancelAnimationFrame(this.rAFId)

    return Promise.resolve(this.rAFId)
  }

  /**
   * Get movements
   * @see @components/index.js#getDefaults
   * @see @components/index.js#getSpecials
   */
  getMovement (piece, isStream = true) {
    const [defaults, specials] = commonArg(getDefaults, getSpecials)(piece)

    return isStream
      ? [defaults, specials]
      : { defaults, specials }
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
      const {
        check,
        checker
      } = this.state
      const {
        notations,
        records,
        turn,
        setMovable
      } = this.props
      const getMovable = Chess.getMovable(notations, records)
      let selectedMovable

      if (isExist(check)) {
        const fns = {
          getMovement: this.getMovement,
          findNotation: Chess.findNotation(notations),
          getMovable
        }
        const alias = Chess.getAlias(turn)
        const simulate = Chess.simulate(fns)
        const simStream = stream(simulate(turn))
        const kingSight = simStream.reduce((acc, kingSimulate) => kingSimulate({
          targetPiece: 'K',
          pretendPiece: 'Q',
          action: 'GET_SIGHT',
          initialValue: []
        }), [])

        console.log('- Simulate method works as expected -')
        console.log('- King sight: ', kingSight)

        notations
          .filter((notation) => notation.substr(0, 1) === alias)
          .map((notation) => Chess.parseNotation(notation))
          .forEach((parsedNotation) => {
            const {
              position: parsedPosition,
              piece: parsedPiece,
              side: parsedSide
            } = parsedNotation
            const {
              defaults: parsedDefaults,
              specials: parsedSpecials
            } = this.getMovement(parsedPiece, false)
            let parsedMovable = getMovable(
              parsedPiece,
              parsedPosition,
              parsedSide
            )(parsedDefaults, parsedSpecials)

            const isSelectedPiece = (
              parsedPiece === piece &&
              parsedPosition === position &&
              Chess.getSide(parsedSide) === side
            )

            if (isExist(parsedMovable)) {
              if (parsedPiece === 'K') {
                const {
                  position: checkerPosition,
                  piece: checkerPiece,
                  side: checkerSide
                } = Chess.parseNotation(checker)
                const {
                  defaults: checkerDefaults,
                  specials: checkerSpecials
                } = this.getMovement(checkerPiece, false)
                const checkerSight = getMovable(
                  checkerPiece,
                  checkerPosition,
                  checkerSide
                )(checkerDefaults, checkerSpecials)

                parsedMovable = parsedMovable.filter((checkTile) => {
                  return checkerSight.indexOf(checkTile) === -1
                })
              } else {
                parsedMovable = intersection(kingSight)(parsedMovable)
              }
            }

            if (isSelectedPiece) {
              selectedMovable = parsedMovable

              console.log(`${parsedPiece}-${parsedPosition}`, selectedMovable)
            }
          })
      } else {
        selectedMovable = getMovable(piece, position, side)(defaults, specials)
      }

      // TODO
      // - find blocking tile first and find tile in movable from each piece
      // - if checked, simulate own pieces movement to block attacked or lose
      // - if block, reset check state

      setMovable(selectedMovable)
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
      const getNextRecords = Chess.saveRecords(notations, records)(/* timestamp */)

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
        turn: nextTurn,
        notations,
        records,
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

        // is your King checked?
        const applyArg = commonArg(Chess.getMovable, Chess.findNotation)
        const fns = applyArg(nextNotations).reduce((getMovable, findNotation) => ({
          getMovement: this.getMovement,
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
          action: 'CHECK',
          initialValue: {
            isChecked: false,
            kingNotation: '',
            checkerNotation: ''
          },

          /**
           * Pretend Queen's movement then King can see every direction
           * @type {String}
           */
          pretendPiece: 'Q'
        })

        if (isChecked) {
          const lastItem = getLastItem(records)
          const enemyTurn = Chess.getEnemy(nextTurn)
          const move = Chess.getMove(lastItem)(enemyTurn)

          // TODO
          // - why 2 times, find why later!!
          // - 1 clue : diagonal
          if (!/\+/.test(move)) {
            const { black } = lastItem
            const side = isExist(black) ? 'black' : 'white'
            const log = lastItem[side]
            const addCheckMark = `${move}+`

            log.move = addCheckMark

            const changedRecords = push(records)(lastItem, false)

            setRecords(changedRecords)
          }
        }

        // console.log(piece)

        this.setState({
          check: isChecked ? kingNotation : '',
          checker: isChecked ? checkerNotation : ''
        })
      }
    })
  }
}

export default enhancer
