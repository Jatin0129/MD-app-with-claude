import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getDubaiRealEstate,
  getAbuDhabiRealEstate,
  getUSARealEstate,
  getRealEstateInsight,
} from '../services/realEstate';
import type { RealEstateData, USARealEstateData } from '../data/mock';

const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes

export interface RealEstateDataState {
  dubai: RealEstateData | null;
  abuDhabi: RealEstateData | null;
  usa: USARealEstateData | null;
  insight: string;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
  getInsight: (region: string) => Promise<void>;
}

export function useRealEstateData(): RealEstateDataState {
  const [dubai, setDubai] = useState<RealEstateData | null>(null);
  const [abuDhabi, setAbuDhabi] = useState<RealEstateData | null>(null);
  const [usa, setUsa] = useState<USARealEstateData | null>(null);
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
      } else {
        setLoading(true);
      }
      setError(null);

      const [d, a, u, ins] = await Promise.all([
        getDubaiRealEstate(),
        getAbuDhabiRealEstate(),
        getUSARealEstate(),
        getRealEstateInsight('Dubai'),
      ]);

      setDubai(d);
      setAbuDhabi(a);
      setUsa(u);
      setInsight(ins);
      setLastUpdated(new Date());
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to load real estate data';
      setError(msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  const getInsight = useCallback(async (region: string) => {
    try {
      const ins = await getRealEstateInsight(region);
      setInsight(ins);
    } catch {
      // Keep existing insight on error
    }
  }, []);

  useEffect(() => {
    fetchData(false);

    // Auto-refresh every 30 minutes
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
    dubai,
    abuDhabi,
    usa,
    insight,
    loading,
    refreshing,
    error,
    lastUpdated,
    refresh,
    getInsight,
  };
}
