import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Button } from '~/components'
import { noop } from '~/utils'
import css from './Menu.css'

const Menu = ({ isDoingMatch, items, onClick }) => {
  const cls = cx(css.menu, {
    [css.menuIngame]: isDoingMatch
  })
  const innerCls = cx({ 'is-doing-match': isDoingMatch })

  return (
    <ul className={cls}>
      {items.map((name) => {
        return (
          <li key={name} className={css.menuItem}>
            <Button className={innerCls} onClick={onClick(name)}>
              {name}
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

Menu.propTypes = {
  isDoingMatch: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func
}

Menu.defaultProps = {
  onClick: noop
}

export default Menu
