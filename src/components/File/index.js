import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import css from './File.css'

const File = ({ tileName, children }) => {
  const isDark = tileName.split('').reduce((rankName, fileName) => {
    const rn = parseInt(rankName, 10)

    if (rn % 2 === 0) {
      return ['b', 'd', 'f', 'h'].includes(fileName)
    } else {
      return ['a', 'c', 'e', 'g'].includes(fileName)
    }
  })

  const cls = cx(css.file, {
    'is-dark': isDark
  })

  return (
    <div className={cls} data-tile-name={tileName}>
      {children}
    </div>
  )
}

File.propTypes = {
  rank: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default File
