import { connect } from 'react-redux';
import { Menu } from '~/components';

function mapStateToProps() {
  return {};
}

const MenuContainer = connect(mapStateToProps)(Menu);

export default MenuContainer;
