import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { isExist } from '@utils'

const enhancer = (WrappedComponent, piece) => class extends PureComponent {
  static propTypes = {
    alias: PropTypes.string.isRequired,
    translated: PropTypes.object,
    check: PropTypes.string,
    onAnimate: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func
    ]),
    onAnimateEnd: PropTypes.func
  }

  static defaultProps = {
    check: '',
    translated: {},
    onAnimateEnd: function () {}
  }

  static movement = WrappedComponent.movement

  componentDidMount () {
    const { translated, onAnimate } = this.props

    if (isExist(translated)) {
      const { axis } = translated

      onAnimate(axis, this.refElement)
    }
  }

  render () {
    const { check, alias } = this.props

    return (
      <WrappedComponent
        getRef={this.getRef}
        onTransitionEnd={this.handleTransitionEnd}
        alias={alias}
        isCheck={isExist(check)}
      />
    )
  }

  getRef = (el) => (this.refElement = el)

  handleTransitionEnd = (evt) => {
    const { translated, onAnimateEnd } = this.props

    if (evt.propertyName === 'top' && isExist(translated)) {
      onAnimateEnd(piece)
    }
  }
}

export default enhancer
