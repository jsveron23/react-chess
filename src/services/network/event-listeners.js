import { compose, reject, equals } from 'ramda';
import { replaceCode, Side } from 'chess/es';
import { ONLINE } from '~/presets';
import { PeerNetwork } from './peer-network';

const peerNetwork = PeerNetwork.of();

class EventListeners {
  /**
   * Create EventListeners and attach to store dispatch
   * @param {Function} dispatch - Redux dispatch function
   */
  constructor(dispatch) {
    this.dispatch = dispatch;

    peerNetwork.on('booted', (id) => this.#handleBooted(id));
    peerNetwork.on('online', () => this.#handleOnline());
    peerNetwork.on('received', (data) => this.#handleReceived(data));
    peerNetwork.on('close', () => this.#handleClose());
    peerNetwork.on('error', () => this.#handleClose());
    // peerNetwork.on('disconnected', this.handleClose);
  }

  /**
   * Create EventListeners instance and return the store
   * @param {object} store - Redux store
   * @return {object} The same store
   */
  static of(store) {
    new EventListeners(store.dispatch);

    return store;
  }

  /**
   * Handle peer booted event
   * @param {string} id - Peer ID
   */
  #handleBooted(id) {
    import('~/store/actions').then(({ openNetworkGame }) => {
      this.dispatch(openNetworkGame(id));
    });
  }

  /**
   * Handle peer online event
   */
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

  /**
   * Handle data received from peer
   * @param {object} data - Received data
   */
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
          const replaceCodeFn = replaceCode(args.snapshot);

          if (command === 'capture') {
            nextArgs.push(
              compose(
                reject(equals(args.selectedCode)),
                replaceCodeFn(args.pretendCode)
              )
            );
          } else if (command === 'move') {
            nextArgs.push(replaceCodeFn(args.selectedCode));
          }

          this.dispatch(afterMoving(...nextArgs));
          this.dispatch(toggleAwaiting());

          break;
        }

        default:
      }
    });
  }

  /**
   * Handle peer connection close
   */
  #handleClose() {
    import('~/store/actions').then(({ closeNetworkGame }) => {
      this.dispatch(closeNetworkGame());
    });
  }
}

export { EventListeners, peerNetwork };
