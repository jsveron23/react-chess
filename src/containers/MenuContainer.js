import { connect } from 'react-redux';
import { Menu } from '~/components';
import { updateMatchType } from '~/store/actions';

function mapStateToProps() {
  return {};
}

const MenuContainer = connect(mapStateToProps, {
  updateMatchType,
})(Menu);

export default MenuContainer;
