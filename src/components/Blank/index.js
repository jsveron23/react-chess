import React, { memo } from 'react'
import PropTypes from 'prop-types'

const Blank = ({ tagName, className }) => {
  const Tag = tagName

  return <Tag className={className} />
}

Blank.propTypes = {
  tagName: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default memo(Blank)
