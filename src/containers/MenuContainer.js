import { connect } from 'react-redux';
import { ActionTypes } from 'redux-undo';
import { FlexRow, Text } from 'ui/es';
import { Menu } from '~/components';
import {
  updateMatchType,
  saveGame,
  undo,
  joinNetworkGame,
} from '~/store/actions';
import { toLocaleDate } from '~/utils';
import { ONE_VS_ONE, SAVE, ONLINE } from '~/config';

function mapStateToProps({
  network: { connected, peerId, lastSaved },
  ingame: { past },
}) {
  return { past, connected, peerId, lastSaved };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const noUndoYet = stateProps.past.length === 0;
  const isConnected = stateProps.connected;
  const lastSaved = toLocaleDate(stateProps.lastSaved);
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
        title: `Save ${lastSaved ? `/ ${lastSaved}` : ''}`,
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
        title: 'Network (WebRTC)',
        disabled: isConnected,
        onClick: () => {
          const id = window.prompt('please input friend peer-id');

          if (id) {
            dispatch(joinNetworkGame(id));
          }
        },
        children: () => {
          return (
            <FlexRow paddingLeft={10} paddingRight={10} fontSize="80%">
              <Text marginBottom={5} fontWeight="bold" flexBasis={60}>
                Peer Id:
              </Text>
              {stateProps.peerId && (
                <Text flex="1" wordBreak="break-all">
                  {stateProps.peerId}
                </Text>
              )}
            </FlexRow>
          );
        },
      },
    ],
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Menu);
