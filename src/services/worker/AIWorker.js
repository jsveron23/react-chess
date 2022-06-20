import { debug } from '~/utils';

class AIWorker {
  task(v, cb, errCb) {
    this.close();
    this.worker = new Worker(new URL('./ai', import.meta.url));
    this.worker.postMessage(v);

    if (typeof cb === 'function') {
      this.worker.addEventListener('message', (evt) => {
        cb(evt.data || {});
        this.close();
      });
    }

    if (typeof errCb === 'function') {
      this.worker.addEventListener('error', (evt) => {
        debug.err('AI error', evt);
        errCb(evt);
        this.close();
      });
    }
  }

  close() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export default new AIWorker();
