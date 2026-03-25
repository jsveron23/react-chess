import { debug } from '~/utils';

class AIWorker {
  /**
   * Run AI task in a Web Worker
   * @param {*} v - Data to send to worker
   * @param {Function} cb - Success callback
   * @param {Function} errCb - Error callback
   */
  task(v, cb, errCb) {
    this.close();
    this.worker = new Worker(new URL('./ai.js', import.meta.url));
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

  /**
   * Terminate the current worker
   */
  close() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

const worker = new AIWorker();

export { worker };
