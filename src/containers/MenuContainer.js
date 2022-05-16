import { connect } from 'react-redux';
import { ActionTypes } from 'redux-undo';
import Box from 'ui-box';
import { Text } from 'ui/es';
import { Menu } from '~/components';
import {
  updateMatchType,
  saveGame,
  undo,
  joinNetworkGame,
} from '~/store/actions';
import { ONE_VS_ONE, SAVE, ONLINE } from '~/config';

function mapStateToProps({ general: { connected, peerId }, ingame: { past } }) {
  return { past, connected, peerId };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const noUndoYet = stateProps.past.length === 0;
  const isConnected = stateProps.connected;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,

    ingameMenu: [
      {
        key: ActionTypes.UNDO,
        title: 'Undo',
        disabled: noUndoYet || isConnected,
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
        disabled: isConnected,
        onClick: () => dispatch(updateMatchType(ONE_VS_ONE)),
      },
      // {
      //   key: ONE_VS_CPU,
      //   title: '1 vs CPU',
      //   disabled: true,
      // },
      {
        key: SAVE,
        title: 'Save',
        disabled: noUndoYet || isConnected,
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
        title: 'Network',
        disabled: isConnected,
        onClick: () => {
          const id = window.prompt('please input id from friend browser');

          if (id) {
            dispatch(joinNetworkGame(id));
          }
        },
        children: () => {
          return (
            <Box>
              <Text marginBottom={5}>Peer Id:</Text>
              {stateProps.peerId && <Text>{stateProps.peerId}</Text>}
            </Box>
          );
        },
      },
    ],
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Menu);
