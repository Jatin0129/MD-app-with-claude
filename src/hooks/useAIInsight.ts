import { useState, useEffect, useRef } from 'react';
import { getPageInsight } from '../services/ai';
import { aiInsights } from '../data/mock';

const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

interface CacheEntry {
  insight: string;
  timestamp: number;
}

// Module-level cache shared across all hook instances
const insightCache = new Map<string, CacheEntry>();

export interface AIInsightState {
  insight: string;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for AI-powered page insights.
 * - Fetches insight on mount using page context data
 * - Caches for 30 minutes per pageKey
 * - Falls back to mock insight on error
 */
export function useAIInsight(
  pageKey: string,
  contextData: Record<string, unknown>
): AIInsightState {
  // Get fallback from mock insights
  const fallback = (aiInsights as Record<string, string>)[pageKey] || aiInsights.home;

  const [insight, setInsight] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    async function fetchInsight() {
      // Check cache first
      const cached = insightCache.get(pageKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        setInsight(cached.insight);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const result = await getPageInsight(pageKey, contextData);

        if (mountedRef.current) {
          setInsight(result);
          insightCache.set(pageKey, {
            insight: result,
            timestamp: Date.now(),
          });
        }
      } catch (e) {
        if (mountedRef.current) {
          setError('AI service unavailable. Using cached insight.');
          // Keep fallback/cached insight — never leave blank
          const stale = insightCache.get(pageKey);
          if (stale) {
            setInsight(stale.insight);
          }
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    }

    fetchInsight();

    return () => {
      mountedRef.current = false;
    };
  }, [pageKey]); // Only re-fetch when pageKey changes

  return { insight, loading, error };
}
