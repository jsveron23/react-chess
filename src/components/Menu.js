import { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ActionTypes } from 'redux-undo';
import { FlexCol, Button, Hr } from 'ui/es';

const Menu = ({ items, updateMatchType, undo }) => {
  const handleClick = useCallback(
    (mKey) => () => {
      switch (mKey) {
        case ActionTypes.UNDO: {
          undo();

          break;
        }

        default: {
          updateMatchType(mKey);

          break;
        }
      }
    },
    [updateMatchType, undo]
  );

  return (
    <FlexCol gap={10} alignItems="center">
      {items.map(({ key, title, ...itemProps }) => {
        const isUndo = key === ActionTypes.UNDO;

        return (
          <Fragment key={key}>
            <Button onClick={handleClick(key)} {...itemProps}>
              {title}
            </Button>

            {isUndo && <Hr />}
          </Fragment>
        );
      })}
    </FlexCol>
  );
};

Menu.propTypes = {
  updateMatchType: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
};

export default Menu;
