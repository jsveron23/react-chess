import { compose, reject, equals } from 'ramda';
import { replaceCode, Side } from 'chess/es';
import { ONLINE } from '~/presets';
import PeerNetwork from './PeerNetwork';

const peerNetwork = PeerNetwork.of();

export default class EventListeners {
  constructor(dispatch) {
    this.dispatch = dispatch;

    peerNetwork.on('booted', (id) => this.#handleBooted(id));
    peerNetwork.on('online', () => this.#handleOnline());
    peerNetwork.on('received', (data) => this.#handleReceived(data));
    peerNetwork.on('close', () => this.#handleClose());
    peerNetwork.on('error', () => this.#handleClose());
    // peerNetwork.on('disconnected', this.handleClose);
  }

  static of(store) {
    new EventListeners(store.dispatch);

    return store;
  }

  #handleBooted(id) {
    import('~/store/actions').then(({ openNetworkGame }) => {
      this.dispatch(openNetworkGame(id));
    });
  }

  #handleOnline() {
    import('~/store/actions').then((actions) => {
      const {
        updateMatchType,
        toggleAwaiting,
        connectedPeerNetwork,
        decideSide,
      } = actions;

      this.dispatch(updateMatchType(ONLINE));
      this.dispatch(connectedPeerNetwork());
      this.dispatch(decideSide(Side.black));
      this.dispatch(toggleAwaiting());
    });
  }

  #handleReceived(data) {
    import('~/store/actions').then((actions) => {
      const { toggleAwaiting, receiveMessage, afterMoving } = actions;
      const { command, args } = data;

      switch (command) {
        case 'message': {
          this.dispatch(
            receiveMessage({
              side: args.side,
              message: args.message,
            })
          );

          break;
        }

        case 'move':
        case 'capture': {
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

          this.dispatch(afterMoving(...nextArgs));
          this.dispatch(toggleAwaiting());

          break;
        }

        default:
      }
    });
  }

  #handleClose() {
    import('~/store/actions').then(({ closeNetworkGame }) => {
      this.dispatch(closeNetworkGame());
    });
  }
}
export { peerNetwork };
