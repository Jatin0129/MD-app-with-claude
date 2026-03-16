import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import {
  ScreenWrapper,
  SectionCard,
  ListRow,
  MetricGrid,
  AlertBox,
  AIInsightCard,
} from '../components/ui';
import { colors, fontSize, spacing } from '../theme/colors';
import { useMarketData } from '../hooks/useMarketData';
import { useAIInsight } from '../hooks/useAIInsight';

export default function MarketsScreen() {
  const {
    indices,
    sukuk,
    commodities: commod,
    loading,
    refreshing,
    error,
    lastUpdated,
  } = useMarketData();

  const { insight } = useAIInsight('markets', {
    indices: indices.map((i) => ({ name: i.name, value: i.value, change: i.changePercent })),
    gold: commod?.gold,
    brent: commod?.brent,
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.textSecondary} />
      </View>
    );
  }

  return (
    <ScreenWrapper title="Financial Markets">
      {/* Error banner — show cached data with warning */}
      {error && (
        <AlertBox type="amber" text={`${error}. Using cached data.`} />
      )}

      {/* Refreshing indicator */}
      {refreshing && (
        <View style={styles.refreshRow}>
          <ActivityIndicator size="small" color={colors.textSecondary} />
          <Text style={styles.refreshText}>Updating...</Text>
        </View>
      )}

      {/* Market Indices */}
      <SectionCard heading="Market indices">
        {indices.map((idx, i) => (
          <ListRow
            key={i}
            left={idx.name}
            right={`${idx.value} (${idx.changePercent})`}
            rightColor={
              idx.changePercent.startsWith('-')
                ? colors.negativeRed
                : colors.positiveGreen
            }
          />
        ))}
        {lastUpdated && (
          <Text style={styles.timestamp}>
            Updated {lastUpdated.toLocaleTimeString()}
          </Text>
        )}
      </SectionCard>

      {/* Sukuk & Bonds */}
      <SectionCard heading="Sukuk and bonds watch">
        {sukuk.map((s, i) => (
          <ListRow key={i} left={s.name} right={`${s.price} · YTM ${s.ytm}`} />
        ))}
      </SectionCard>

      {/* Commodities */}
      {commod && (
        <MetricGrid
          items={[
            { label: 'Gold', value: commod.gold.price, change: commod.gold.change },
            { label: 'Brent Crude', value: commod.brent.price, change: commod.brent.change },
          ]}
        />
      )}

      {/* AI Insight */}
      <AIInsightCard text={insight} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pageBg,
  },
  refreshRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  refreshText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  timestamp: {
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'right',
  },
});
