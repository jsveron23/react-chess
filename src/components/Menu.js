import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ActionTypes } from 'redux-undo';
import Box from 'ui-box';
import { FlexCol, Button } from 'ui/es';

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
          <>
            <Button key={key} onClick={handleClick(key)} {...itemProps}>
              {title}
            </Button>

            {isUndo && (
              <Box
                is="span"
                backgroundColor="#cacaca"
                width="100%"
                height={1}
              />
            )}
          </>
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
