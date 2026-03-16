import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenWrapper, AlertBox } from '../components/ui';
import { colors, fontSize, spacing, radius } from '../theme/colors';
import { DUBAI_KPIS } from '../data/reTransactionsData';
import { alerts, sobhaSales, sobhaCollections } from '../data/mock';
import type { HomeStackParamList } from '../navigation/AppNavigator';
import type { PersistedSalesMISState, SalesMISRow } from '../utils/salesMisTypes';
import type { PersistedCollectionsMISState } from '../utils/collectionsMisTypes';
import { COLLECTIONS_ENTITIES } from '../utils/collectionsMisTypes';

// ─── Storage keys (must match MIS screens) ──────────────────────────────────

const SALES_STORAGE_KEY = 'sales-mis:last-upload:v1';
const COLLECTIONS_STORAGE_KEY = 'collections-mis:last-upload:v1';

// ─── Greeting ────────────────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'Good Morning';
  if (h >= 12 && h < 17) return 'Good Afternoon';
  if (h >= 17 && h < 21) return 'Good Evening';
  return 'Good Night'; // 9 PM – 5 AM
}

const LAST_UPDATED = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

// ─── Format helpers ─────────────────────────────────────────────────────────

function formatAed(value: number): string {
  if (value === 0) return 'AED 0';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `AED ${(value / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(0)}M`;
  if (abs >= 1_000) return `AED ${(value / 1_000).toFixed(0)}K`;
  return `AED ${value.toFixed(0)}`;
}

// ─── KPI defaults from mock data ────────────────────────────────────────────

const DUBAI_VAL_STR = DUBAI_KPIS[0]?.value || 'N/A';
const DUBAI_TXNS_STR = DUBAI_KPIS[1]?.value || 'N/A';

// ─── Quick action items ────────────────────────────────────────────────────

type NavTarget = { tab: 'Sobha'; screen: string } | { tab: 'Real Estate' } | { tab: 'Home'; screen: string };

const QUICK_ACTIONS: { label: string; sub: string; target: NavTarget }[] = [
  { label: 'Sobha MIS Center', sub: 'Sales \u00b7 Collections \u00b7 Finance', target: { tab: 'Sobha', screen: 'SobhaMain' } },
  { label: 'Daily Sales MIS', sub: 'Project-wise sales tracker', target: { tab: 'Sobha', screen: 'DailySalesMIS' } },
  { label: 'Collections MIS', sub: 'Overdue ageing & escrow', target: { tab: 'Sobha', screen: 'DailyCollectionsMIS' } },
  { label: 'Dubai Transactions', sub: 'DLD market dashboard', target: { tab: 'Real Estate' } },
  { label: 'Ask Sobha AI', sub: 'Natural language queries', target: { tab: 'Home', screen: 'AI' } },
  { label: 'Documents', sub: 'Reports & presentations', target: { tab: 'Home', screen: 'Docs' } },
];

// ═══════════════════════════════════════════════════════════════════════════════

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // ── Live KPI state (loaded from AsyncStorage) ──
  const [salesToday, setSalesToday] = useState<string>(sobhaSales.bookings);
  const [unitsSoldToday, setUnitsSoldToday] = useState<string>(sobhaSales.unitsSold);
  const [salesSub, setSalesSub] = useState('from Daily Sales MIS');
  const [collectionsToday, setCollectionsToday] = useState<string>(sobhaCollections.collections);
  const [collectionsSub, setCollectionsSub] = useState(`${sobhaCollections.vsTarget} of target`);

  // ── Load MIS data from AsyncStorage on every screen focus ──
  useFocusEffect(
    useCallback(() => {
      loadMISData();
    }, []),
  );

  async function loadMISData() {
    try {
      // ── Sales MIS ──
      const salesRaw = await AsyncStorage.getItem(SALES_STORAGE_KEY);
      if (salesRaw) {
        const salesState: PersistedSalesMISState = JSON.parse(salesRaw);
        const rows: SalesMISRow[] = salesState.rows || [];

        // Sum DTD across all 3 entities (Sobha LLC + Downtown UAQ + Siniya Island)
        let totalDtdSales = 0;
        let projectsWithSalesToday = 0;
        for (const row of rows) {
          if (row.dtd && row.dtd > 0) {
            totalDtdSales += row.dtd;
            projectsWithSalesToday += 1;
          }
        }

        if (totalDtdSales > 0) {
          setSalesToday(formatAed(totalDtdSales));
          setUnitsSoldToday(String(projectsWithSalesToday));
          setSalesSub('DTD \u00b7 All entities');
        }
      }

      // ── Collections MIS ──
      const collRaw = await AsyncStorage.getItem(COLLECTIONS_STORAGE_KEY);
      if (collRaw) {
        const collState: PersistedCollectionsMISState = JSON.parse(collRaw);

        // Sum DTD across all 3 entity totals
        let totalDtdCollections = 0;
        for (const entity of COLLECTIONS_ENTITIES) {
          const entityTotal = collState.totals?.[entity];
          if (entityTotal?.dtd) {
            totalDtdCollections += entityTotal.dtd;
          }
        }

        if (totalDtdCollections > 0) {
          setCollectionsToday(formatAed(totalDtdCollections));
          setCollectionsSub('DTD \u00b7 All entities');
        }
      }
    } catch {
      // Fallback to mock data (already set as defaults)
    }
  }

  // ── Navigation helpers ──
  const handleNav = (target: NavTarget) => {
    if (target.tab === 'Home' && 'screen' in target) {
      navigation.navigate(target.screen as any);
    } else if (target.tab === 'Sobha') {
      const parent = navigation.getParent() as any;
      parent?.navigate('Sobha', { screen: (target as any).screen });
    } else if (target.tab === 'Real Estate') {
      const parent = navigation.getParent() as any;
      parent?.navigate('Real Estate');
    }
  };

  const navigateToSobhaScreen = (screen: string) => {
    const parent = navigation.getParent() as any;
    parent?.navigate('Sobha', { screen });
  };

  // ── KPI items with navigation targets ──
  const KPI_ITEMS = [
    { label: 'Sales Today', value: salesToday, sub: salesSub, color: colors.blueIcon, onPress: () => navigateToSobhaScreen('DailySalesMIS') },
    { label: 'Collections', value: collectionsToday, sub: collectionsSub, color: '#d97706', onPress: () => navigateToSobhaScreen('DailyCollectionsMIS') },
    { label: 'Dubai Market', value: DUBAI_VAL_STR, sub: `${DUBAI_TXNS_STR} sales`, color: '#059669', onPress: () => { const parent = navigation.getParent() as any; parent?.navigate('Real Estate'); } },
    { label: 'Units Sold', value: unitsSoldToday, sub: 'Projects with sales today', color: '#7c3aed', onPress: () => navigateToSobhaScreen('DailySalesMIS') },
  ];

  return (
    <ScreenWrapper>
      {/* ── Greeting ── */}
      <Text style={st.greeting}>{getGreeting()},</Text>
      <Text style={st.name}>Mr. Francis Alfred</Text>

      {/* ── Last Updated ── */}
      <View style={st.updatedRow}>
        <View style={st.updatedDot} />
        <Text style={st.updatedText}>Last updated: {LAST_UPDATED}</Text>
      </View>

      {/* ── KPI Cards — 2×2 grid, tappable ── */}
      <View style={st.kpiGrid}>
        {KPI_ITEMS.map((item, i) => (
          <Pressable key={i} style={[st.kpiCard, { borderTopColor: item.color }]} onPress={item.onPress}>
            <Text style={st.kpiLabel}>{item.label}</Text>
            <Text style={st.kpiValue}>{item.value}</Text>
            <Text style={st.kpiSub}>{item.sub}</Text>
          </Pressable>
        ))}
      </View>

      {/* ── Key Alerts ── */}
      {alerts.length > 0 && (
        <View style={st.alertSection}>
          <Text style={st.sectionLabel}>KEY ALERTS</Text>
          {alerts.slice(0, 3).map((alert, i) => (
            <AlertBox key={i} type={alert.type} text={alert.text} />
          ))}
        </View>
      )}

      {/* ── Quick Actions ── */}
      <Text style={st.sectionLabel}>QUICK ACCESS</Text>
      <View style={st.actionsGrid}>
        {QUICK_ACTIONS.map((item, i) => (
          <Pressable
            key={i}
            style={st.actionCard}
            onPress={() => handleNav(item.target)}
          >
            <Text style={st.actionTitle}>{item.label}</Text>
            <Text style={st.actionSub}>{item.sub}</Text>
          </Pressable>
        ))}
      </View>
    </ScreenWrapper>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const st = StyleSheet.create({
  greeting: {
    fontSize: fontSize.lg,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  name: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  updatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  updatedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.positiveGreen,
    marginRight: 6,
  },
  updatedText: {
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  // ── KPI Cards (2×2 grid) ──
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
    marginBottom: spacing.md,
  },
  kpiCard: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: spacing.sm,
    borderTopWidth: 2,
  },
  kpiLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  kpiValue: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 26,
  },
  kpiSub: {
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    marginTop: 3,
  },

  // ── Alerts ──
  alertSection: {
    marginBottom: spacing.md,
  },
  sectionLabel: {
    fontSize: fontSize.xxs,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },

  // ── Quick Actions ──
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
    marginBottom: spacing.lg,
  },
  actionCard: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: spacing.sm,
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  actionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  actionSub: {
    fontSize: fontSize.xxs,
    color: colors.textMuted,
  },
});
