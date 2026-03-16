import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * AI rate limiting and cost control.
 * - Maximum 20 AI queries per hour per session
 * - Maximum 5 document analyses per session
 * - Tracks usage in AsyncStorage
 *
 * TODO: Replace with server-side rate limiting and
 * user authentication in production
 */

const QUERY_LIMIT = 20;
const QUERY_WINDOW = 60 * 60 * 1000; // 1 hour
const DOC_LIMIT = 5;
const DOC_WINDOW = 60 * 60 * 1000; // 1 hour

const STORAGE_KEY_QUERIES = '@sobha_ai_queries';
const STORAGE_KEY_DOCS = '@sobha_ai_docs';

interface UsageLog {
  timestamps: number[];
}

async function getUsageLog(key: string): Promise<UsageLog> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return { timestamps: [] };
    return JSON.parse(raw);
  } catch {
    return { timestamps: [] };
  }
}

async function saveUsageLog(key: string, log: UsageLog): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(log));
  } catch {
    // Silent fail — rate limiting is advisory
  }
}

function pruneOldEntries(timestamps: number[], windowMs: number): number[] {
  const cutoff = Date.now() - windowMs;
  return timestamps.filter((t) => t > cutoff);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  minutesRemaining: number;
}

export async function checkAIRateLimit(): Promise<RateLimitResult> {
  const log = await getUsageLog(STORAGE_KEY_QUERIES);
  const active = pruneOldEntries(log.timestamps, QUERY_WINDOW);

  if (active.length >= QUERY_LIMIT) {
    const oldestInWindow = Math.min(...active);
    const resetTime = oldestInWindow + QUERY_WINDOW;
    const minutesRemaining = Math.ceil((resetTime - Date.now()) / 60000);
    return { allowed: false, remaining: 0, minutesRemaining };
  }

  return {
    allowed: true,
    remaining: QUERY_LIMIT - active.length,
    minutesRemaining: 0,
  };
}

export async function checkDocRateLimit(): Promise<RateLimitResult> {
  const log = await getUsageLog(STORAGE_KEY_DOCS);
  const active = pruneOldEntries(log.timestamps, DOC_WINDOW);

  if (active.length >= DOC_LIMIT) {
    const oldestInWindow = Math.min(...active);
    const resetTime = oldestInWindow + DOC_WINDOW;
    const minutesRemaining = Math.ceil((resetTime - Date.now()) / 60000);
    return { allowed: false, remaining: 0, minutesRemaining };
  }

  return {
    allowed: true,
    remaining: DOC_LIMIT - active.length,
    minutesRemaining: 0,
  };
}

export async function recordAIQuery(): Promise<void> {
  const log = await getUsageLog(STORAGE_KEY_QUERIES);
  log.timestamps = pruneOldEntries(log.timestamps, QUERY_WINDOW);
  log.timestamps.push(Date.now());
  await saveUsageLog(STORAGE_KEY_QUERIES, log);
}

export async function recordDocQuery(): Promise<void> {
  const log = await getUsageLog(STORAGE_KEY_DOCS);
  log.timestamps = pruneOldEntries(log.timestamps, DOC_WINDOW);
  log.timestamps.push(Date.now());
  await saveUsageLog(STORAGE_KEY_DOCS, log);
}
