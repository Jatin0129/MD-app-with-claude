import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RealEstateStackParamList } from '../navigation/AppNavigator';
import {
  TabBarRow,
  MetricGrid,
  SectionCard,
  ListRow,
  AlertBox,
  AIInsightCard,
  InfoBox,
} from '../components/ui';
import { AppHeader } from '../components/AppHeader';
import { colors, fontSize, spacing, radius } from '../theme/colors';
import { useRealEstateData } from '../hooks/useRealEstateData';
import {
  fetchAllLiveRealEstate,
  type LiveREData,
  type DLDTransaction,
  type AreaSummary,
  type AbuDhabiLiveData,
} from '../services/realEstateAPI';

const TABS = ['Dubai', 'Abu Dhabi', 'USA'];

// ─── Source pill ─────────────────────────────────────────────────────────────

function SourcePill({ source }: { source: 'dataset' | 'estimated' }) {
  const isDataset = source === 'dataset';
  return (
    <View
      style={[
        styles.pill,
        { backgroundColor: isDataset ? colors.blueBg : colors.amberBg },
      ]}
    >
      <View
        style={[
          styles.pillDot,
          { backgroundColor: isDataset ? colors.blueIcon : colors.amberColor },
        ]}
      />
      <Text
        style={[
          styles.pillText,
          { color: isDataset ? colors.blueText : colors.amberText },
        ]}
      >
        {isDataset ? 'Dataset' : 'Estimated'}
      </Text>
    </View>
  );
}

// ─── Skeleton placeholder ───────────────────────────────────────────────────

function LiveSkeleton() {
  return (
    <View style={styles.skeletonWrap}>
      <View style={styles.skeletonBar} />
      <View style={[styles.skeletonBar, { width: '60%' }]} />
      <View style={[styles.skeletonBar, { width: '80%' }]} />
    </View>
  );
}

// ─── Transaction row ────────────────────────────────────────────────────────

function TransactionRow({ t }: { t: DLDTransaction }) {
  return (
    <View style={styles.txRow}>
      <View style={styles.txLeft}>
        <Text style={styles.txArea}>{t.area}</Text>
        <Text style={styles.txMeta}>
          {t.propertyType} · {t.size}
        </Text>
      </View>
      <View style={styles.txRight}>
        <Text style={styles.txValue}>{t.value}</Text>
        <Text style={styles.txDate}>{t.date}</Text>
      </View>
    </View>
  );
}

// ─── Area summary row ───────────────────────────────────────────────────────

function AreaRow({ a }: { a: AreaSummary }) {
  return (
    <View style={styles.txRow}>
      <View style={styles.txLeft}>
        <Text style={styles.txArea}>{a.area}</Text>
        <Text style={styles.txMeta}>{a.transactions} transactions</Text>
      </View>
      <View style={styles.txRight}>
        <Text style={styles.txValue}>{a.totalValue}</Text>
        <Text style={styles.txDate}>{a.avgPricePerSqft}/sqft</Text>
      </View>
    </View>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

type RENav = NativeStackNavigationProp<RealEstateStackParamList>;

export default function RealEstateScreen() {
  const navigation = useNavigation<RENav>();
  const [activeTab, setActiveTab] = useState('Dubai');
  const {
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
  } = useRealEstateData();

  const [liveData, setLiveData] = useState<LiveREData | null>(null);
  const [liveLoading, setLiveLoading] = useState(true);
  const [liveError, setLiveError] = useState<string | null>(null);

  const loadLiveData = useCallback(async () => {
    try {
      setLiveLoading(true);
      setLiveError(null);
      const data = await fetchAllLiveRealEstate();
      setLiveData(data);
    } catch (e) {
      setLiveError(e instanceof Error ? e.message : 'Failed to load dataset snapshot');
    } finally {
      setLiveLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLiveData();
  }, [loadLiveData]);

  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      getInsight(tab);
    },
    [getInsight]
  );

  const onRefresh = useCallback(async () => {
    await Promise.all([refresh(), loadLiveData()]);
  }, [refresh, loadLiveData]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.textSecondary} />
      </View>
    );
  }

  // ── Existing render functions (unchanged) ──

  const renderDubai = () =>
    dubai && (
      <>
        <MetricGrid
          items={[
            { label: 'Transactions', value: dubai.transactions },
            { label: 'Sales value', value: dubai.salesValue },
            { label: 'Avg price/sqft', value: dubai.avgPricePerSqft },
            { label: 'New launches', value: dubai.newLaunches },
          ]}
        />
        <SectionCard heading="Top areas by transactions">
          {dubai.topAreas.map((a, i) => (
            <ListRow key={i} left={a.name} right={a.transactions} />
          ))}
        </SectionCard>
      </>
    );

  const renderAbuDhabi = () =>
    abuDhabi && (
      <>
        <MetricGrid
          items={[
            { label: 'Transactions', value: abuDhabi.transactions },
            { label: 'Sales value', value: abuDhabi.salesValue },
            { label: 'Avg price/sqft', value: abuDhabi.avgPricePerSqft },
            { label: 'New launches', value: abuDhabi.newLaunches },
          ]}
        />
        <SectionCard heading="Top areas by transactions">
          {abuDhabi.topAreas.map((a, i) => (
            <ListRow key={i} left={a.name} right={a.transactions} />
          ))}
        </SectionCard>
      </>
    );

  const renderUSA = () =>
    usa && (
      <>
        <MetricGrid
          items={[
            { label: 'Mortgage rate', value: usa.mortgageRate },
            { label: 'Housing supply', value: usa.housingSupply },
            { label: 'Case-Shiller', value: usa.caseShiller },
            { label: 'Market', value: 'Monitoring' },
          ]}
        />
        <SectionCard heading="Market note">
          <InfoBox text={usa.metroWatch} />
        </SectionCard>
      </>
    );

  // ── Live data sections ──

  const renderDubaiLive = () => {
    if (liveLoading) return <LiveSkeleton />;
    if (!liveData) return null;
    const d = liveData.dubai;
    return (
      <View style={styles.liveSection}>
        <View style={styles.liveHeader}>
          <Text style={styles.liveTitle}>Dubai Transaction Extract</Text>
          <SourcePill source={d.source} />
        </View>

        {/* Recent transactions table */}
        <View style={styles.liveCard}>
          <Text style={styles.liveCardTitle}>Recent Transactions</Text>
          {d.recentTransactions.map((t) => (
            <TransactionRow key={t.id} t={t} />
          ))}
        </View>

        {/* Area summary */}
        <View style={styles.liveCard}>
          <Text style={styles.liveCardTitle}>Area Summary</Text>
          {d.areaSummary.map((a, i) => (
            <AreaRow key={i} a={a} />
          ))}
        </View>

      </View>
    );
  };

  const renderAbuDhabiLive = () => {
    if (liveLoading) return <LiveSkeleton />;
    if (!liveData) return null;
    const ad = liveData.abuDhabi;
    return (
      <View style={styles.liveSection}>
        <View style={styles.liveHeader}>
          <Text style={styles.liveTitle}>Market Overview</Text>
          <SourcePill source={ad.source} />
        </View>

        <View style={styles.liveCard}>
          <MetricGrid
            items={[
              { label: 'Total transactions', value: ad.totalTransactions.toLocaleString() },
              { label: 'Total value', value: ad.totalValue },
              { label: 'Avg price', value: ad.avgPrice },
            ]}
          />
          <View style={{ marginTop: spacing.md }}>
            {ad.topAreas.map((a, i) => (
              <ListRow key={i} left={a.area} right={a.count.toLocaleString()} />
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.textSecondary}
            colors={[colors.textPrimary]}
          />
        }
      >
        <AppHeader title="Real Estate Markets" />

        {/* Error banner */}
        {error && (
          <AlertBox type="amber" text={`${error}. Using cached data.`} />
        )}

        {liveError && <AlertBox type="amber" text={`Dataset data: ${liveError}`} />}

        <TabBarRow tabs={TABS} active={activeTab} onSelect={handleTabChange} />

        {activeTab === 'Dubai' && renderDubai()}
        {activeTab === 'Abu Dhabi' && renderAbuDhabi()}
        {activeTab === 'USA' && renderUSA()}

        {/* ── Live data sections (below existing content) ── */}
        {activeTab === 'Dubai' && renderDubaiLive()}
        {activeTab === 'Abu Dhabi' && renderAbuDhabiLive()}

        {/* ── Transaction report card ── */}
        <TouchableOpacity
          style={styles.reportCard}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('RETransactions', { tab: activeTab })}
        >
          <View>
            <Text style={styles.reportTitle}>View Full Transaction Report</Text>
            <Text style={styles.reportSub}>
              Developer breakdown · Area analysis · Market signals
            </Text>
          </View>
          <Text style={styles.reportArrow}>→</Text>
        </TouchableOpacity>

        <AIInsightCard text={insight} />

        {lastUpdated && (
          <Text style={styles.timestamp}>
            Updated {lastUpdated.toLocaleTimeString()}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pageBg,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.pageBg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  timestamp: {
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: spacing.sm,
  },

  // ── Source pill ──
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  pillText: {
    fontSize: fontSize.xxs,
    fontWeight: '600',
  },

  // ── Skeleton ──
  skeletonWrap: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  skeletonBar: {
    height: 14,
    borderRadius: radius.sm,
    backgroundColor: colors.border,
    width: '100%',
  },

  // ── Live sections ──
  liveSection: {
    marginTop: spacing.xl,
  },
  liveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  liveTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  liveCard: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  liveCardTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },

  // ── Transaction rows ──
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  txLeft: {
    flex: 1,
    marginRight: spacing.md,
  },
  txRight: {
    alignItems: 'flex-end',
  },
  txArea: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  txMeta: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  txValue: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  txDate: {
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // ── Report card ──
  reportCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blueBg,
    borderWidth: 1,
    borderColor: 'rgba(55,138,221,0.2)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  reportTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.blueText,
  },
  reportSub: {
    fontSize: fontSize.xs,
    color: colors.blueText,
    opacity: 0.7,
    marginTop: 3,
  },
  reportArrow: {
    fontSize: fontSize.xl,
    color: colors.blueText,
    fontWeight: '600',
  },
});
