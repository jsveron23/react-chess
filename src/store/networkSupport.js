import { compose, reject, equals } from 'ramda';
import { replaceCode } from 'chess/es';
import { PeerNetwork } from '~/utils';
import { openNetworkGame, connectedPeerNetwork, afterMoving } from './actions';

const peerNetwork = new PeerNetwork();

export function networkSupport(store) {
  const { dispatch } = store;

  peerNetwork.on('booted', (id) => {
    dispatch(openNetworkGame(id));
  });

  peerNetwork.on('online', () => {
    dispatch(connectedPeerNetwork());
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

    dispatch(afterMoving(..._args));
  });

  peerNetwork.on('error', (/* err */) => {
    // TODO dispatch
  });

  return store;
}

export default peerNetwork;
