import {
  marketIndices as mockIndices,
  sukukBonds as mockSukuk,
  commodities as mockCommodities,
  aiInsights,
} from '../data/mock';
import type { MarketIndex, SukukBond, Commodity } from '../data/mock';

// ─── Public API (mock data — no external API calls) ─────────────────────────

export async function getMarketIndices(): Promise<MarketIndex[]> {
  return mockIndices;
}

export async function getSukukBonds(): Promise<SukukBond[]> {
  return mockSukuk;
}

export async function getCommodities(): Promise<{ gold: Commodity; brent: Commodity }> {
  return mockCommodities;
}

export async function getMarketInsight(): Promise<string> {
  return aiInsights.markets;
}
