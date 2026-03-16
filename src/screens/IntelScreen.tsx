import React from 'react';
import {
  ScreenWrapper,
  SectionCard,
  InfoBox,
  AIInsightCard,
} from '../components/ui';
import { useAIInsight } from '../hooks/useAIInsight';

export default function IntelScreen() {
  const { insight } = useAIInsight('intel', {
    globalEvents: ['Fed rate hold', 'UAE-India trade expansion', 'Luxury RE shift to Dubai'],
    competitors: ['Emaar 3 launches Dubai Hills', 'Aldar Yas Island AED 2.5B'],
  });

  return (
    <ScreenWrapper title="Strategic Intelligence">
      <SectionCard heading="Global events">
        <InfoBox text="US Federal Reserve signals potential rate hold in Q2 2026 — markets anticipate stability in borrowing costs through H2" />
        <InfoBox text="UAE-India bilateral trade agreement expansion expected to boost real estate investment flows by 15-20% in 2026" />
        <InfoBox text="Global luxury real estate demand shifting toward Dubai and Singapore as tax-efficient jurisdictions" />
      </SectionCard>

      <SectionCard heading="Real estate news">
        <InfoBox text="Dubai Land Department reports record Q1 transactions — AED 142B in total real estate sales, up 28% YoY" />
        <InfoBox text="RERA introduces new developer escrow regulations effective April 2026 — higher compliance standards expected" />
        <InfoBox text="Abu Dhabi's Saadiyat Island cultural district driving premium property demand with 22% price appreciation" />
      </SectionCard>

      <SectionCard heading="Competitor activity">
        <InfoBox text="Emaar: Launched 3 new residential projects in Dubai Hills Estate with combined GDV of AED 6.2B. Focus on ultra-premium segment with smart home integration." />
        <InfoBox text="Aldar: Expanding Yas Island portfolio with AED 2.5B mixed-use development. Also acquiring commercial assets in Abu Dhabi CBD for portfolio diversification." />
      </SectionCard>

      <AIInsightCard text={insight} />
    </ScreenWrapper>
  );
}
