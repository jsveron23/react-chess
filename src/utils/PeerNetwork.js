import EventEmitter from 'events';
import { Peer } from 'peerjs';

class PeerNetwork extends EventEmitter {
  peer = null;
  conn = null;
  peerId = null;
  lastPeerId = null;

  constructor() {
    super();

    this.peer = new Peer();

    this._handlePeerOpen = this._handlePeerOpen.bind(this);
    this._handlePeerConnection = this._handlePeerConnection.bind(this);
    this._handlePeerDisconnected = this._handlePeerDisconnected.bind(this);
    this._handlePeerClose = this._handlePeerClose.bind(this);

    this.peer.on('open', this._handlePeerOpen);
    this.peer.on('connection', this._handlePeerConnection);
    this.peer.on('disconnected', this._handlePeerDisconnected);
    this.peer.on('close', this._handlePeerClose);
    this.peer.on('error', (err) => this.emit('error', err));
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

    this._listen();
  }

  _listen() {
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

    this.conn.on('close', this._handlePeerClose);
  }

  _handlePeerOpen() {
    if (this.peer.id === null) {
      this.peer.id = this.lastPeerId;
    } else {
      this.lastPeerId = this.peer.id;
    }

    this.emit('booted', this.peer.id);
  }

  _handlePeerConnection(c) {
    if (this.conn && this.conn.open) {
      c.on('open', () => {
        c.send('Already connected to another client');

        setTimeout(c.close(), 500);
      });

      return;
    }

    this.conn = c;

    this._listen();
  }

  _handlePeerDisconnected() {
    try {
      this.peer.id = this.lastPeerId;
      this.peer._lastServerId = this.lastPeerId;

      this.peer.reconnect();
    } catch (err) {
      console.error(err);
    } finally {
      this.emit('disconnected');
    }
  }

  _handlePeerClose() {
    this.conn = null;

    this.emit('close');
  }
}

export default PeerNetwork;
