import { connect } from 'react-redux';
import { ActionTypes } from 'redux-undo';
import { Menu } from '~/components';
import { updateMatchType, undo } from '~/store/actions';

function mapStateToProps({ ingame: { past } }) {
  return {
    items: [
      {
        key: ActionTypes.UNDO,
        title: 'Undo',
        disabled: past.length === 0,
      },
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
  undo,
})(Menu);

export default MenuContainer;
