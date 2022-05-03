import { connect } from 'react-redux';
import { ActionTypes } from 'redux-undo';
import { Menu } from '~/components';
import { updateMatchType, saveGame, undo } from '~/store/actions';
import { ONE_VS_ONE, ONE_VS_CPU, SAVE, ONLINE } from '~/config';

function mapStateToProps({ ingame: { past } }) {
  return { past };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const noUndoYet = stateProps.past.length === 0;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,

    ingameMenu: [
      {
        key: ActionTypes.UNDO,
        title: 'Undo',
        disabled: noUndoYet,
        onClick: () => dispatch(undo()),
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
        onClick: () => dispatch(updateMatchType(ONE_VS_ONE)),
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
        onClick: () => dispatch(saveGame()),
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Menu);
