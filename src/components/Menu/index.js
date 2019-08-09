import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Button } from '~/components'
import { noop } from '~/utils'
import css from './Menu.css'

const Menu = ({ isDoingMatch, items, disabledItems, onClick }) => {
  return (
    <ul className={cx(css.menu, { [css.menuIngame]: isDoingMatch })}>
      {items.map((name) => {
        if (disabledItems.includes(name)) {
          return null
        }

        function handleClick (evt) {
          evt.preventDefault()

          onClick(name)
        }

        return (
          <li key={name} className={css.menuItem}>
            <Button
              className={cx({ 'is-doing-match': isDoingMatch })}
              onClick={handleClick}
            >
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
  disabledItems: PropTypes.array,
  onClick: PropTypes.func
}

Menu.defaultProps = {
  disabledItems: [],
  onClick: noop
}

export default memo(Menu)
