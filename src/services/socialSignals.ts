import { socialPlatforms, aiInsights } from '../data/mock';
import type { SocialPlatform } from '../data/mock';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// TODO: Replace with real social media analytics API (Sprinklr, Hootsuite)
export async function getSocialPlatforms(): Promise<SocialPlatform[]> {
  await delay(300);
  return socialPlatforms;
}

// TODO: Replace with real sentiment analysis API
export async function getSentimentData(): Promise<{ overall: string; trend: string }> {
  await delay(300);
  return {
    overall: 'Overall brand sentiment is positive at 78%. LinkedIn driving strongest engagement with corporate content. Instagram reaching new demographics.',
    trend: 'Sentiment trending upward over past 30 days, driven by Hartland II launch coverage and positive media mentions.',
  };
}

// TODO: Replace with real AI analysis endpoint
export async function getSocialInsight(): Promise<string> {
  await delay(300);
  return aiInsights.social;
}
