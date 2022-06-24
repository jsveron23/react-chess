import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { identity } from 'ramda';
import { FlexCol, Button } from 'ui/es';

const MenuItems = ({ data }) => {
  return (
    <FlexCol gap={10} alignItems="center">
      {data.map(
        ({ key, title, onClick = identity, children: Extra, ...itemProps }) => {
          return (
            <Fragment key={key}>
              <Button onClick={onClick} {...itemProps}>
                {title}
              </Button>

              {Extra && <Extra />}
            </Fragment>
          );
        }
      )}
    </FlexCol>
  );
};

MenuItems.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      children: PropTypes.elementType,
    })
  ).isRequired,
};

export default MenuItems;
