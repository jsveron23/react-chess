import { memo } from 'react';
import PropTypes from 'prop-types';
import { Hr } from 'ui/es';
import SubMenu from './internal/SubMenu';

const Menu = ({ ingameMenu, mainMenu }) => {
  return (
    <>
      <SubMenu data={ingameMenu} />
      <Hr is="p" marginTop={10} marginBottom={10} />
      <SubMenu data={mainMenu} />
    </>
  );
};

Menu.propTypes = {
  ingameMenu: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
};

export default memo(Menu);
