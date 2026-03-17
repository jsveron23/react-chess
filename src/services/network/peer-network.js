import EventEmitter from 'events';
import { Peer } from 'peerjs';
import { debug } from '~/utils';

class PeerNetwork extends EventEmitter {
  peer = null;
  conn = null;
  lastPeerId = null;

  constructor() {
    super();

    this.peer = new Peer();
    this.peer.on('open', () => this.#handlePeerOpen());
    this.peer.on('connection', (c) => this.#handlePeerConnection(c));
    this.peer.on('disconnected', () => this.#handlePeerDisconnected());
    this.peer.on('close', () => this.#handlePeerClose());
    this.peer.on('error', (err) => this.emit('error', err));
  }

  /**
   * Create a new PeerNetwork instance
   * @return {PeerNetwork} New instance
   */
  static of() {
    return new PeerNetwork();
  }

  /**
   * Send data to connected peer
   * @param {*} data - Data to send
   */
  send(data) {
    if (!this.conn) {
      return;
    }

    this.conn.send(data);
  }

  /**
   * Join a peer by ID
   * @param {string} id - Peer ID to connect to
   */
  join(id) {
    if (this.conn) {
      this.conn.close();
    }

    this.conn = this.peer.connect(id, {
      reliable: true,
    });

    this.conn.on('open', () => this.conn.send('online'));

    this.#listen();
  }

  /**
   * Attach data/close listeners to current connection
   */
  #listen() {
    this.conn.on('data', (data) => {
      switch (data) {
        case 'online': {
          this.emit('online');

          break;
        }

        default: {
          this.emit('received', data);
        }
      }
    });

    this.conn.on('close', () => this.#handlePeerClose());
  }

  /**
   * Handle peer open event
   */
  #handlePeerOpen() {
    if (this.peer.id === null) {
      this.peer.id = this.lastPeerId;
    } else {
      this.lastPeerId = this.peer.id;
    }

    this.emit('booted', this.peer.id);
  }

  /**
   * Handle incoming peer connection
   * @param {object} c - Incoming connection
   */
  #handlePeerConnection(c) {
    if (this.conn && this.conn.open) {
      c.on('open', () => {
        c.send('Already connected to another client');

        setTimeout(c.close(), 500);
      });

      return;
    }

    this.conn = c;

    this.#listen();
  }

  /**
   * Handle peer disconnected event
   */
  #handlePeerDisconnected() {
    try {
      this.peer.id = this.lastPeerId;
      this.peer._lastServerId = this.lastPeerId;

      this.peer.reconnect();
    } catch (err) {
      debug.err('PeerNetwork - disconnected/reconnect issue: ', err);
    } finally {
      this.emit('disconnected');
    }
  }

  /**
   * Handle peer close event
   */
  #handlePeerClose() {
    this.conn = null;

    this.emit('close');
  }
}

export { PeerNetwork };
