import { PeerNetwork } from '~/utils';
import { openNetworkGame, connectedPeerNetwork } from './actions';

const peerNetwork = new PeerNetwork();

export function networkSupport(store) {
  const { dispatch } = store;

  peerNetwork.on('booted', (id) => {
    dispatch(openNetworkGame(id));
  });

  peerNetwork.on('online', () => {
    dispatch(connectedPeerNetwork());
  });

  peerNetwork.on('received', (/* data */) => {
    // TODO dispatch
  });

  peerNetwork.on('error', (/* err */) => {
    // TODO dispatch
  });

  return store;
}

export default peerNetwork;
