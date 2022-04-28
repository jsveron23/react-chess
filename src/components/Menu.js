import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlexCol, Button } from 'ui/es';

const Menu = ({ items, updateMatchType }) => {
  const handleClick = useCallback(
    (mKey) => () => updateMatchType(mKey),
    [updateMatchType]
  );

  return (
    <FlexCol gap={10} alignItems="center">
      {items.map(({ key, title, ...itemProps }) => {
        return (
          <Button key={key} onClick={handleClick(key)} {...itemProps}>
            {title}
          </Button>
        );
      })}
    </FlexCol>
  );
};

Menu.propTypes = {
  updateMatchType: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
};

export default Menu;
