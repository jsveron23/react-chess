import { Peer } from 'peerjs';
import { identity } from 'ramda';

class PeerNetwork {
  peer = null;
  conn = null;
  peerId = null;
  lastPeerId = null;

  constructor(sendToPeer = identity, getPeerId = identity, getData = identity) {
    this.peer = new Peer();
    this.sendToPeer = sendToPeer;
    this.getPeerId = getPeerId;
    this.getData = getData;

    this.handlePeerOpen = this.handlePeerOpen.bind(this);
    this.handlePeerConnection = this.handlePeerConnection.bind(this);
    this.handlePeerDisconnected = this.handlePeerDisconnected.bind(this);
    this.handlePeerClose = this.handlePeerClose.bind(this);

    this.peer.on('open', this.handlePeerOpen);
    this.peer.on('connection', this.handlePeerConnection);
    this.peer.on('disconnected', this.handlePeerDisconnected);
    this.peer.on('close', this.handlePeerClose);
    this.peer.on('error', console.error);
  }

  autoClose(c) {
    c.send('Already connected to another client');

    setTimeout(c.close(), 500);
  }

  handlePeerOpen() {
    if (this.peer.id === null) {
      this.peer.id = this.lastPeerId;
    } else {
      this.lastPeerId = this.peer.id;
    }

    this.getPeerId(this.peer.id || this.lastPeerId);
  }

  handlePeerConnection(c) {
    if (this.conn && this.conn.open) {
      c.on('open', () => this.autoClose(c));

      return;
    }

    this.conn = c;
    this.handleData();
  }

  handlePeerDisconnected() {
    this.peer.id = this.lastPeerId;
    this.peer._lastServerId = this.lastPeerId;

    this.peer.reconnect();
  }

  handlePeerClose() {
    this.conn = null;
  }

  join(id) {
    if (this.conn) {
      this.conn.close();
    }

    this.conn = this.peer.connect(id, {
      reliable: true,
    });

    this.conn.on('open', () => {
      this.conn.send('connected');
    });

    this.handleData();
  }

  handleData() {
    this.conn.on('data', (data) => {
      switch (data) {
        case 'connected': {
          this.sendToPeer();
          break;
        }

        default: {
          this.getData(data);
        }
      }
    });

    this.conn.on('close', this.handlePeerClose);
  }
}

export default PeerNetwork;
