import React from 'react'
import css from './file.css'

const File = ({ rankNotation, fileNotation }) => {
  const notation = `${rankNotation}${fileNotation}`

  return <span data-notation={notation} className={css.file} />
}

export default File
