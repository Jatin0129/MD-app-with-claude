import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import {
  ScreenWrapper,
  SectionCard,
  ListRow,
  InfoBox,
  AlertBox,
  AIInsightCard,
} from '../components/ui';
import { colors } from '../theme/colors';
import { getSocialPlatforms, getSentimentData } from '../services/socialSignals';
import { useAIInsight } from '../hooks/useAIInsight';
import type { SocialPlatform } from '../data/mock';

export default function SocialScreen() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [sentiment, setSentiment] = useState<{ overall: string; trend: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { insight } = useAIInsight('social', {
    platforms: platforms.map((p) => ({ platform: p.platform, sentiment: p.sentiment })),
    sentimentOverall: sentiment?.overall,
  });

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const [p, s] = await Promise.all([
        getSocialPlatforms(),
        getSentimentData(),
      ]);
      setPlatforms(p);
      setSentiment(s);
    } catch {
      setError('Failed to load social data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.textSecondary} />
      </View>
    );
  }

  if (error) {
    return (
      <ScreenWrapper title="Social Signals">
        <AlertBox type="amber" text={error} />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper title="Social Signals">
      <SectionCard heading="Platform watch">
        {platforms.map((p, i) => (
          <ListRow
            key={i}
            left={p.platform}
            right={`${p.sentiment} · ${p.description}`}
          />
        ))}
      </SectionCard>

      <SectionCard heading="Sentiment watch">
        {sentiment && (
          <>
            <InfoBox text={sentiment.overall} />
            <InfoBox text={sentiment.trend} />
          </>
        )}
      </SectionCard>

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
});
