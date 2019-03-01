import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import logoImg from '~/assets/logo.png'
import css from './Logo.css'

const Logo = ({ isDoingMatch, title }) => {
  const cls = cx(css.logo)

  if (isDoingMatch) {
    return <div className={cls}>{title}</div>
  }

  return (
    <div className={cls}>
      <img src={logoImg} alt={title} className={css.logoImg} />
    </div>
  )
}

Logo.propTypes = {
  title: PropTypes.string.isRequired,
  isDoingMatch: PropTypes.bool.isRequired
}

export default memo(Logo)
