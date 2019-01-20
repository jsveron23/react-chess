import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Button } from '~/components'
import css from './Menu.css'

const MenuItems = ({ isMatching, items, onClick }) => {
  const cls = cx({ 'is-matching': isMatching })

  return items.map((name) => {
    const handleClick = onClick(name)

    return (
      <li key={name} className={css.menuItem}>
        <Button className={cls} onClick={handleClick}>
          {name}
        </Button>
      </li>
    )
  })
}

MenuItems.propTypes = {
  isMatching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

const Menu = ({ isMatching, items, onClick }) => {
  const cls = cx(css.menu, {
    'l-flex-row': isMatching
  })

  return (
    <ul className={cls}>
      <MenuItems isMatching={isMatching} items={items} onClick={onClick} />
    </ul>
  )
}

Menu.propTypes = {
  isMatching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Menu
