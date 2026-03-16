import React from 'react';
import {
  ScreenWrapper,
  MetricCard,
  MetricGrid,
  SectionCard,
  ListRow,
  AIInsightCard,
} from '../components/ui';
import { portfolio } from '../data/mock';
import { useAIInsight } from '../hooks/useAIInsight';

export default function PersonalScreen() {
  const { insight } = useAIInsight('personal', {
    totalValue: portfolio.totalValue,
    allocation: portfolio.allocation,
    ytdReturn: portfolio.ytdReturn,
    benchmark: portfolio.benchmark,
  });

  return (
    <ScreenWrapper title="Personal Finance">
      <MetricCard
        label="Portfolio value"
        value={portfolio.totalValue}
        style={{ marginBottom: 16 }}
      />

      <SectionCard heading="Asset allocation">
        <ListRow left="Sukuk" right={portfolio.allocation.sukuk} />
        <ListRow left="Gold" right={portfolio.allocation.gold} />
        <ListRow left="Equities" right={portfolio.allocation.equities} />
        <ListRow left="Other" right={portfolio.allocation.other} />
      </SectionCard>

      <SectionCard heading="Performance">
        <MetricGrid
          items={[
            { label: 'YTD return', value: portfolio.ytdReturn, change: portfolio.ytdReturn },
            { label: 'Benchmark', value: portfolio.benchmark, change: portfolio.benchmark },
          ]}
        />
      </SectionCard>

      <AIInsightCard text={insight} />
    </ScreenWrapper>
  );
}
