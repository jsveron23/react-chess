import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Button } from '~/components'
import css from './Menu.css'

const Menu = ({ isMatching, items, onClick }) => {
  const cls = cx(css.menu, {
    [css.menuIngame]: isMatching
  })

  return (
    <ul className={cls}>
      {items.map((name) => {
        const innerCls = cx({ 'is-matching': isMatching })
        const handleClick = onClick(name)

        return (
          <li key={name} className={css.menuItem}>
            <Button className={innerCls} onClick={handleClick}>
              {name}
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

Menu.propTypes = {
  isMatching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func
}

Menu.defaultProps = {
  onClick: function () {}
}

export default Menu
