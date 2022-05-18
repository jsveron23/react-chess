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
    const getNextSnapshot = replaceCode(args.snapshot, args.selectedCode);

    if (command === 'capture') {
      _args.push(compose(reject(equals(args.selectedCode)), getNextSnapshot));
    } else if (command === 'move') {
      _args.push(getNextSnapshot);
    }

    dispatch(toggleAwaiting());
    dispatch(afterMoving(..._args));
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
