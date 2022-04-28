import { connect } from 'react-redux';
import { Menu } from '~/components';
import { updateMatchType } from '~/store/actions';

function mapStateToProps() {
  return {
    items: [
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
    ],
  };
}

const MenuContainer = connect(mapStateToProps, {
  updateMatchType,
})(Menu);

export default MenuContainer;
