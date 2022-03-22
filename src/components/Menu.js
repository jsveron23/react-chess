import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FlexCol, Button } from 'ui/es';

const Menu = ({ updateMatchType }) => {
  const handleClick = useCallback(
    (mKey) => () => updateMatchType(mKey),
    [updateMatchType]
  );

  const menuItems = useMemo(() => {
    return [
      {
        key: '1v1',
        title: '1 vs 1',
        disabled: false,
      },
      {
        key: '1vscpu',
        title: '1 vs CPU',
        disabled: true,
      },
      {
        key: 'save',
        title: 'Save',
        disabled: true,
      },
      {
        key: 'import',
        title: 'Import',
        disabled: true,
      },
      {
        key: 'export',
        title: 'Export',
        disabled: true,
      },
      {
        key: 'observe',
        title: 'Observe',
        disabled: true,
      },
      {
        key: 'online',
        title: 'Online',
        disabled: true,
      },
    ];
  }, []);

  return (
    <FlexCol gap={10} alignItems="center">
      {menuItems.map(({ key, title, ...itemProps }) => {
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
};

export default Menu;
