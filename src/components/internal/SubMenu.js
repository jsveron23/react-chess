import { memo } from 'react';
import PropTypes from 'prop-types';
import { FlexCol, Button } from 'ui/es';

const SubMenu = ({ data, onClick }) => {
  return (
    <FlexCol gap={10} alignItems="center">
      {data.map(({ key, title, ...itemProps }) => {
        return (
          <Button key={key} onClick={onClick(key)} {...itemProps}>
            {title}
          </Button>
        );
      })}
    </FlexCol>
  );
};

SubMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
};

export default memo(SubMenu);
