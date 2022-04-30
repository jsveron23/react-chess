import { connect } from 'react-redux';
import { ActionTypes } from 'redux-undo';
import { Menu } from '~/components';
import { updateMatchType, saveGame, undo } from '~/store/actions';
import { ONE_VS_ONE, ONE_VS_CPU, SAVE, ONLINE } from '~/config';

function mapStateToProps({ ingame: { past } }) {
  const noUndoYet = past.length === 0;

  return {
    ingameMenu: [
      {
        key: ActionTypes.UNDO,
        title: 'Undo',
        disabled: noUndoYet,
      },
      // {
      //   key: ActionTypes.REDO,
      //   title: 'Redo',
      //   disabled: future.length === 0,
      // },
    ],
    mainMenu: [
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
        disabled: noUndoYet,
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

function mapDispatchToProps(dispatch) {
  return {
    handleMenuButtonClick(key) {
      return () => {
        switch (key) {
          case ActionTypes.UNDO: {
            dispatch(undo());

            break;
          }

          case SAVE: {
            dispatch(saveGame());

            break;
          }

          default: {
            dispatch(updateMatchType(key));

            break;
          }
        }
      };
    },
  };
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;
