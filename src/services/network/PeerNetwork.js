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

  static of() {
    return new PeerNetwork();
  }

  send(data) {
    if (!this.conn) {
      return;
    }

    this.conn.send(data);
  }

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

  #handlePeerOpen() {
    if (this.peer.id === null) {
      this.peer.id = this.lastPeerId;
    } else {
      this.lastPeerId = this.peer.id;
    }

    this.emit('booted', this.peer.id);
  }

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

  #handlePeerClose() {
    this.conn = null;

    this.emit('close');
  }
}

export default PeerNetwork;
