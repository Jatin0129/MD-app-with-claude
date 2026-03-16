import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getMarketIndices,
  getSukukBonds,
  getCommodities,
  getMarketInsight,
} from '../services/markets';
import type { MarketIndex, SukukBond, Commodity } from '../data/mock';

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export interface MarketDataState {
  indices: MarketIndex[];
  sukuk: SukukBond[];
  commodities: { gold: Commodity; brent: Commodity } | null;
  insight: string;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useMarketData(): MarketDataState {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [sukuk, setSukuk] = useState<SukukBond[]>([]);
  const [commodities, setCommodities] = useState<{ gold: Commodity; brent: Commodity } | null>(null);
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
        // Keep showing stale data while refreshing — don't clear state
      } else {
        setLoading(true);
      }
      setError(null);

      const [idx, sk, cm, ins] = await Promise.all([
        getMarketIndices(),
        getSukukBonds(),
        getCommodities(),
        getMarketInsight(),
      ]);

      setIndices(idx);
      setSukuk(sk);
      setCommodities(cm);
      setInsight(ins);
      setLastUpdated(new Date());
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to load market data';
      setError(msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    fetchData(false);

    // Auto-refresh every 5 minutes
    intervalRef.current = setInterval(() => {
      fetchData(true);
    }, REFRESH_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData]);

  return {
    indices,
    sukuk,
    commodities,
    insight,
    loading,
    refreshing,
    error,
    lastUpdated,
    refresh,
  };
}
