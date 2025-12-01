// src/components/InstagramEmbed.tsx
import { useCallback, useEffect, useRef, useState } from 'react';
import { loadScriptWithRetry } from '@/utils/scriptLoader';
import embedQueue from '@/utils/embedsQueue';
import { sleep } from '@/lib/utils';

type InstagramEmbedProps = {
  url: string;
  withCaption?: boolean;
  className?: string;
  timeout?: number;
};

export const INSTAGRAM_EMBED_SCRIPT_URL = 'https://www.instagram.com/embed.js';

async function waitForIframeOrTimeout(container: Element, ms: number) {
  return new Promise<void>((resolve, reject) => {
    if (container.querySelector('iframe')) {
      resolve();
      return;
    }
    const obs = new MutationObserver(() => {
      if (container.querySelector('iframe')) {
        obs.disconnect();
        clearTimeout(to);
        resolve();
      }
    });
    obs.observe(container, { childList: true, subtree: true });
    const to = window.setTimeout(() => {
      obs.disconnect();
      reject(new Error('iframe not found within timeout'));
    }, ms);
  });
}

export default function InstagramEmbed({
  url,
  withCaption = false,
  className = '',
  timeout = 10000,
}: InstagramEmbedProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const initialized = useRef(false);

  // The function enqueued into the shared queue
  const enqueueInit = useCallback(async function (container: Element) {
    setStatus('loading');

    // Add a task that will execute under queue control
    try {
      await embedQueue.add(async () => {
        await loadScriptWithRetry(INSTAGRAM_EMBED_SCRIPT_URL, {
          attempts: 3,
          baseDelay: 600,
          maxDelay: 5000,
          timeoutPerAttempt: 20000,
        });

        // Call instagram process (may process multiple blockquotes, but we run serially)
        try {
          window.instgrm?.Embeds?.process();
        } catch (e) {
          console.warn(e);  // non fatal
        }

        // Wait for iframe to appear in THIS container only
        await waitForIframeOrTimeout(container, Math.min(timeout, 20000));
        // small delay to allow iframe paints
        await sleep(120);
      });

      setStatus('ready');
    } catch (err) {
      console.error('Instagram embed init failed', err);
      setStatus('error');
    }
  }, [timeout]);

  // create the blockquote (only once)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    while (el.firstChild) el.removeChild(el.firstChild);

    const block = document.createElement('blockquote');
    block.className = 'instagram-media';
    if (withCaption) block.setAttribute('data-instgrm-captioned', '');
    block.setAttribute('data-instgrm-permalink', String(url));
    block.setAttribute('data-instgrm-version', '14');
    el.appendChild(block);
  }, [url, withCaption]);

  // IntersectionObserver: enqueue only when visible (or near)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setStatus('idle');
    initialized.current = false;

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting && !initialized.current) {
        initialized.current = true;
        enqueueInit(el);
        io.disconnect();
      }
    };

    const io = new IntersectionObserver(onIntersect, { root: null, rootMargin: '300px', threshold: 0.01 });
    io.observe(el);

    return () => { io.disconnect(); };
  }, [url, withCaption, timeout, enqueueInit]);

  // UI: loading spinner, the embed container, or error fallback
  return (
    <div className={`relative ${className} ${status === 'loading' ? 'h-52' : ''}`}>
      {/* Loader overlay */}
      {status === 'loading' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-black/60">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-gray-700 dark:border-orange-400 dark:border-t-background" />
            <span className="text-sm text-gray-700 dark:text-white/80">Loading Instagram post…</span>
          </div>
        </div>
      )}

      {/* Error fallback */}
      {status === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-md text-center">
          <p className="text-sm text-red-700 dark:text-red-200">Unable to load Instagram post.</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs text-blue-600 dark:text-blue-300 underline"
          >
            Open on Instagram
          </a>
        </div>
      )}

      {/* Container where Instagram script will hydrate the blockquote */}
      <div ref={ref} className={`${status === 'error' ? 'opacity-60' : ''}`} />
    </div>
  );
}
