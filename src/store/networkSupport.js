import { compose, reject, equals } from 'ramda';
import { replaceCode, Side } from 'chess/es';
import { PeerNetwork } from '~/utils';
import {
  toggleAwaiting,
  openNetworkGame,
  closeNetworkGame,
  connectedPeerNetwork,
  afterMoving,
  decideSide,
} from './actions';

const peerNetwork = new PeerNetwork();

export function networkSupport(store) {
  const { dispatch } = store;

  peerNetwork.on('booted', (id) => {
    dispatch(openNetworkGame(id));
  });

  peerNetwork.on('online', () => {
    dispatch(connectedPeerNetwork());
    dispatch(decideSide(Side.black));
    dispatch(toggleAwaiting());
  });

  peerNetwork.on('received', (data) => {
    const { command, args } = data;
    const _args = [args.nextTileName, args.selectedCode];
    const _replaceCode = replaceCode(args.snapshot);

    if (command === 'capture') {
      _args.push(
        compose(
          reject(equals(args.selectedCode)),
          _replaceCode(args.pretendCode)
        )
      );
    } else if (command === 'move') {
      _args.push(_replaceCode(args.selectedCode));
    }

    dispatch(afterMoving(..._args));
    dispatch(toggleAwaiting());
  });

  peerNetwork.on('disconnected', (/* err */) => {
    // dispatch(closeNetworkGame());
  });

  peerNetwork.on('close', (/* err */) => {
    dispatch(closeNetworkGame());
  });

  peerNetwork.on('error', (/* err */) => {
    dispatch(closeNetworkGame());
  });

  return store;
}

export default peerNetwork;
