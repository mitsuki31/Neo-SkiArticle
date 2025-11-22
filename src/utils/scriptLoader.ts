import { sleep } from '@/lib/utils';

declare global {
  interface Window {
    __scriptLoaders__?: Record<string, Promise<void>>;
    instgrm?: {
      Embeds: {
        process: () => void;
      }
    }
  }
}

type LoadOpts = { timeout?: number };

type RetryOpts = {
  attempts?: number;
  baseDelay?: number;
  maxDelay?: number;
  timeoutPerAttempt?: number | null;
};

export function loadScriptOnce(src: string, opts: LoadOpts = {}): Promise<void> {
  const timeout = opts.timeout ?? 15000; // default 15s
  window.__scriptLoaders__ = window.__scriptLoaders__ || {};

  // reuse existing loader if present
  if (typeof window.__scriptLoaders__[src] !== 'undefined') return window.__scriptLoaders__[src];

  const p = new Promise<void>((resolve, reject) => {
    let timeoutId: number | undefined;
    let scriptEl: HTMLScriptElement | null = null;
    let settled = false;

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
      if (scriptEl) {
        scriptEl.removeEventListener('load', onLoad);
        scriptEl.removeEventListener('error', onError);
      }
    };

    const finishResolve = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    };

    const finishReject = (err: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(err);
    };

    const onError = () => {
      finishReject(new Error(`Failed to load script ${src}`));
    };

    const onLoad = () => {
      // script loaded, but the library may initialise asynchronously;
      // poll briefly for the expected global, with small cap (we don't want infinite)
      const start = Date.now();
      const pollInterval = 150;
      const pollMax = 3000;  // small polling window (3s) to check readiness

      const poll = () => {
        // detect instagram readiness (example) — generalize by checking global
        // if you need to be generic, avoid checking `window.instgrm` here;
        // simply resolve and let caller check/process.
        if (typeof window.instgrm?.Embeds?.process === 'function') {
          finishResolve();
          return;
        }
        if (Date.now() - start > pollMax) {
          // script loaded but API didn't become available in pollMax
          // still resolve — caller may still call process() later
          finishResolve();
          return;
        }
        setTimeout(poll, pollInterval);
      };

      poll();
    };

    // fast path: if available already, resolve
    if (typeof window.instgrm?.Embeds?.process === 'function') {
      resolve();
      return;
    }

    // Reuse existing script tag if one exists with same src
    const existing = Array.from(document.scripts).find(
      (s) => s.getAttribute('src') === src || s.getAttribute('data-src') === src
    ) as HTMLScriptElement | undefined;

    if (existing) {
      scriptEl = existing;
    } else {
      scriptEl = document.createElement('script');
      scriptEl.src = src;
      scriptEl.async = true;
      scriptEl.defer = true;
      scriptEl.setAttribute('data-src', src);
      document.head.appendChild(scriptEl);
    }

    scriptEl.addEventListener('load', onLoad);
    scriptEl.addEventListener('error', onError);

    // Only set a timeout if provided and > 0
    if (timeout && timeout > 0) {
      timeoutId = window.setTimeout(() => {
        // We deliberately do not remove the script element here to avoid canceling browser request immediately
        // Instead we reject and let caller decide to remove or retry. But to avoid memory leaks we remove listeners.
        scriptEl?.removeEventListener('load', onLoad);
        scriptEl?.removeEventListener('error', onError);
        finishReject(new Error(`Timeout loading ${src} after ${timeout}ms`));
      }, timeout);
    }
  });

  // Cache the promise; remove on rejection so future calls can retry
  window.__scriptLoaders__[src] = p;
  p.catch(() => {
    if (window.__scriptLoaders__ && window.__scriptLoaders__[src] === p) {
      delete window.__scriptLoaders__[src];
    }
  });

  return p;
}

export async function loadScriptWithRetry(src: string, opts: RetryOpts = {}): Promise<void> {
  const attempts = opts?.attempts ?? 3;
  const baseDelay = opts?.baseDelay ?? 500;
  const maxDelay = opts?.maxDelay ?? 5000;
  const timeoutPerAttempt = opts?.timeoutPerAttempt ?? 15000;

  let attempt = 0;
  while (attempt < attempts) {
    attempt++;
    try {
      await loadScriptOnce(src, { timeout: timeoutPerAttempt });
      return;
    } catch (err) {
      // If offline, wait for 'online' event before retrying
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        await new Promise((resolve) => {
          const onOnline = () => {
            window.removeEventListener('online', onOnline);
            resolve(undefined);
          };
          window.addEventListener('online', onOnline);
        });
      } else {
        // exponential backoff with jitter
        const exp = Math.min(maxDelay, baseDelay * 2 ** (attempt - 1));
        const jitter = Math.random() * (exp / 2);
        const delay = Math.floor(exp / 2 + jitter);
        await sleep(delay);
      }
      // on last attempt, rethrow
      if (attempt >= attempts) throw err;
    }
  }
}
