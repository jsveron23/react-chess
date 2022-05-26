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
} from '~/store/actions';

const peerNetwork = PeerNetwork.of();

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
    const nextArgs = [args.nextTileName, args.selectedCode];
    const _replaceCode = replaceCode(args.snapshot);

    if (command === 'capture') {
      nextArgs.push(
        compose(
          reject(equals(args.selectedCode)),
          _replaceCode(args.pretendCode)
        )
      );
    } else if (command === 'move') {
      nextArgs.push(_replaceCode(args.selectedCode));
    }

    dispatch(afterMoving(...nextArgs));
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
