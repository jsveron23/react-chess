import { Hr } from 'ui/es';
import { MenuItems } from './menu/menu-items';

const Menu = ({ ingameMenu, mainMenu }) => {
  return (
    <>
      <MenuItems data={ingameMenu} />
      <Hr is="p" marginTop={10} marginBottom={10} />
      <MenuItems data={mainMenu} />
    </>
  );
};


export { Menu };
