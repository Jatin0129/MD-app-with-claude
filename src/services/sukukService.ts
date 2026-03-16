/**
 * Sukuk & Bond Service — Placeholder for live data.
 *
 * No free API exists for sukuk pricing. This service is structured
 * to match the exact shape a real API would return, making future
 * integration seamless.
 *
 * TODO: Connect to one of these premium feeds:
 * - Nasdaq Dubai Bond Feed (sukuk pricing, YTM, spread data)
 * - Bloomberg Fixed Income API (BVAL pricing, analytics)
 * - Refinitiv Eikon Fixed Income (real-time sukuk quotes)
 * - IHS Markit (bond pricing and analytics)
 */

import { sukukBonds } from '../data/mock';
import type { SukukBond } from '../data/mock';

export interface SukukDetail extends SukukBond {
  isin?: string;
  maturityDate?: string;
  couponRate?: string;
  issuer?: string;
  currency?: string;
  lastUpdated?: string;
}

/**
 * Fetch all tracked sukuk and bond instruments.
 * TODO: Replace with Nasdaq Dubai or Bloomberg API call.
 */
export async function getSukukList(): Promise<SukukBond[]> {
  // Mock data structured to match expected API response shape
  return sukukBonds;
}

/**
 * Fetch detailed sukuk information by name.
 * TODO: Replace with real bond analytics API.
 */
export async function getSukukDetail(name: string): Promise<SukukDetail | null> {
  const bond = sukukBonds.find((s) => s.name === name);
  if (!bond) return null;

  // Extended mock data matching real API shape
  return {
    ...bond,
    isin: 'XS0000000000',
    maturityDate: '2028-06-15',
    couponRate: '5.50%',
    issuer: bond.name.split(' ')[0],
    currency: 'USD',
    lastUpdated: new Date().toISOString(),
  };
}
