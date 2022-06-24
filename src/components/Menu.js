import PropTypes from 'prop-types';
import { Hr } from 'ui/es';
import MenuItems from './menu/MenuItems';

const Menu = ({ ingameMenu, mainMenu }) => {
  return (
    <>
      <MenuItems data={ingameMenu} />
      <Hr is="p" marginTop={10} marginBottom={10} />
      <MenuItems data={mainMenu} />
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

export default Menu;
