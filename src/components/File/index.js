import React from 'react'
import css from './file.css'

const File = ({ position, children }) => (
  <span data-position={position} className={css.file}>
    {children}
  </span>
)

export default File
