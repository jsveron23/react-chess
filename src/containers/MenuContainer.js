import { connect } from 'react-redux';
import { ActionTypes } from 'redux-undo';
import { Menu } from '~/components';
import { updateMatchType, undo } from '~/store/actions';
import { ONE_VS_ONE, ONE_VS_CPU, SAVE, ONLINE } from '~/config';

function mapStateToProps({ ingame: { past } }) {
  return {
    items: [
      {
        key: ActionTypes.UNDO,
        title: 'Undo',
        disabled: past.length === 0,
      },
      {
        key: ONE_VS_ONE,
        title: '1 vs 1',
        disabled: false,
      },
      {
        key: ONE_VS_CPU,
        title: '1 vs CPU',
        disabled: true,
      },
      {
        key: SAVE,
        title: 'Save',
        disabled: true,
      },
      // {
      //   key: IMPORT,
      //   title: 'Import',
      //   disabled: true,
      // },
      // {
      //   key: EXPORT,
      //   title: 'Export',
      //   disabled: true,
      // },
      {
        key: ONLINE,
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
