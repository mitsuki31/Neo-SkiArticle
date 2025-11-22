type Task<T> = () => Promise<T>;

export class EmbedsQueue {
  private concurrency: number;
  private running = 0;
  private queue: Array<{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      task: Task<any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolve: (v: any | PromiseLike<any>) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reject: (e: any) => void;
  }> = [];

  constructor(concurrency = 1) {
    this.concurrency = Math.max(1, concurrency);
  }

  setConcurrency(n: number) {
    this.concurrency = Math.max(1, n);
    this.processQueue();
  }

  add<T>(task: Task<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      // start processing
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.running >= this.concurrency) return;
    const next = this.queue.shift();
    if (!next) return;

    this.running++;
    try {
      const res = await next.task();
      next.resolve(res);
    } catch (err) {
      next.reject(err);
    } finally {
      this.running--;
      // schedule next tick so we don't deep-recurse
      setTimeout(() => this.processQueue(), 0);
    }
  }
}

// export singleton with default concurrency 1 (serial)
const singleton = new EmbedsQueue(1);

export default singleton;
