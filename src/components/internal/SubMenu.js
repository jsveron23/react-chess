import { memo } from 'react';
import PropTypes from 'prop-types';
import { identity } from 'ramda';
import { FlexCol, Button } from 'ui/es';

const SubMenu = ({ data }) => {
  return (
    <FlexCol gap={10} alignItems="center">
      {data.map(({ key, title, onClick = identity, ...itemProps }) => {
        return (
          <Button key={key} onClick={onClick} {...itemProps}>
            {title}
          </Button>
        );
      })}
    </FlexCol>
  );
};

SubMenu.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
};

export default memo(SubMenu);
