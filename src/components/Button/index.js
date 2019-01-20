import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import css from './Button.css'

const Button = ({ isDisabled, children, className, onClick }) => {
  const cls = cx(css.button, className, {
    'is-disabled': isDisabled
  })

  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  className: '',
  onClick: function () {}
}

export default Button
