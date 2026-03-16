/**
 * Request queue with rate limiting for Alpha Vantage free tier.
 * - Spaces API calls 15 seconds apart
 * - Caches results for 5 minutes
 * - Returns cached result if available
 *
 * TODO: Upgrade to paid tier for production (no rate limits)
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MIN_INTERVAL = 15 * 1000; // 15 seconds between requests

const cache = new Map<string, CacheEntry<unknown>>();
let lastRequestTime = 0;
const pendingQueue: Array<{
  key: string;
  fn: () => Promise<unknown>;
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
}> = [];
let isProcessing = false;

async function processQueue(): Promise<void> {
  if (isProcessing || pendingQueue.length === 0) return;
  isProcessing = true;

  while (pendingQueue.length > 0) {
    const item = pendingQueue.shift()!;

    // Check cache first
    const cached = cache.get(item.key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      item.resolve(cached.data);
      continue;
    }

    // Wait for rate limit
    const now = Date.now();
    const timeSinceLast = now - lastRequestTime;
    if (timeSinceLast < MIN_INTERVAL) {
      await new Promise((r) => setTimeout(r, MIN_INTERVAL - timeSinceLast));
    }

    try {
      lastRequestTime = Date.now();
      const result = await item.fn();
      cache.set(item.key, { data: result, timestamp: Date.now() });
      item.resolve(result);
    } catch (error) {
      // Return stale cache on error if available
      const stale = cache.get(item.key);
      if (stale) {
        console.log(`[Queue] Returning stale cache for ${item.key}`);
        item.resolve(stale.data);
      } else {
        item.reject(error);
      }
    }
  }

  isProcessing = false;
}

export function queueRequest<T>(key: string, fn: () => Promise<T>): Promise<T> {
  // Return from cache immediately if fresh
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return Promise.resolve(cached.data as T);
  }

  return new Promise<T>((resolve, reject) => {
    pendingQueue.push({
      key,
      fn: fn as () => Promise<unknown>,
      resolve: resolve as (value: unknown) => void,
      reject,
    });
    processQueue();
  });
}

export function clearCache(): void {
  cache.clear();
}

export function getCacheEntry<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  return entry.data as T;
}
