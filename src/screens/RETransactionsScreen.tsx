import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabBarRow } from '../components/ui';
import { AppHeader } from '../components/AppHeader';
import { colors, fontSize, spacing, radius } from '../theme/colors';
import {
  fetchDubaiLiveData,
  fetchAbuDhabiLiveData,
  type DubaiLiveData,
  type AbuDhabiLiveData,
} from '../services/realEstateAPI';
import {
  DUBAI_KPIS,
  DUBAI_DEVELOPERS,
  DUBAI_AREAS,
  DUBAI_PROJECTS,
  DUBAI_UNIT_MIX,
  DUBAI_VALUE_SPLIT,
  DUBAI_SIGNALS,
  ABU_DHABI_KPIS,
  ABU_DHABI_DEVELOPERS,
  ABU_DHABI_AREAS,
  ABU_DHABI_PROJECTS,
  ABU_DHABI_UNIT_MIX,
  ABU_DHABI_SIGNALS,
  USA_KPIS,
  USA_METROS,
  USA_SIGNALS,
  DEFAULT_DATE_RANGE,
  type MarketKPIs,
  type DeveloperRow,
  type AreaRow,
  ProjectRow,
  type UnitMixRow,
  type ValueSplit,
  type MarketSignal,
  type MetroRow,
} from '../data/reTransactionsData';
import {
  parseAbuDhabiCSV,
  filterAbuDhabiData,
  type AbuDhabiParsedData,
} from '../utils/abuDhabiCsvParser';
import {
  parseDubaiCSV,
  filterDubaiData,
  type DubaiParsedData,
} from '../utils/dubaiCsvParser';
import { getDubaiPrecomputed } from '../data/dubaiPrecomputed';
import { getAbuDhabiPrecomputed } from '../data/abuDhabiPrecomputed';

const AD_STORAGE_KEY = 'ad-transactions-csv:v1';
const DUBAI_STORAGE_KEY = 'dubai-transactions-csv:v1';

// ─── Constants ──────────────────────────────────────────────────────────────

const MARKET_TABS = ['Dubai', 'Abu Dhabi', 'USA'];
const TIMELINE_OPTIONS = ['All', 'YTD', 'QTD', 'MTD', 'This Week'];
const TXN_TYPES = ['All', 'Off-Plan', 'Secondary'];
const PROP_TYPES = ['All', 'Apartment', 'Villa', 'Townhouse', 'Commercial'];

// ─── Sub-components ─────────────────────────────────────────────────────────

function SourcePill({ source }: { source: 'dataset' | 'estimated' }) {
  const isDataset = source === 'dataset';
  return (
    <View style={[s.pill, { backgroundColor: isDataset ? colors.blueBg : colors.amberBg }]}>
      <View style={[s.pillDot, { backgroundColor: isDataset ? colors.blueIcon : colors.amberColor }]} />
      <Text style={[s.pillLabel, { color: isDataset ? colors.blueText : colors.amberText }]}>
        {isDataset ? 'Dataset' : 'Estimated'}
      </Text>
    </View>
  );
}

function FilterPill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[s.filterPill, active && s.filterPillActive]}
    >
      <Text style={[s.filterPillText, active && s.filterPillTextActive]}>{label}</Text>
    </Pressable>
  );
}

function FilterSection({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string;
  onSelect: (v: string) => void;
}) {
  return (
    <View style={s.filterGroup}>
      <Text style={s.filterGroupLabel}>{label}</Text>
      <View style={s.filterRow}>
        {options.map((opt) => (
          <FilterPill
            key={opt}
            label={opt}
            active={active === opt}
            onPress={() => onSelect(opt)}
          />
        ))}
      </View>
    </View>
  );
}

function KPICard({ item }: { item: MarketKPIs }) {
  return (
    <View style={s.kpiCard}>
      <Text style={s.kpiLabel}>{item.label}</Text>
      <Text style={s.kpiValue}>{item.value}</Text>
      <Text style={s.kpiSub}>{item.sub}</Text>
    </View>
  );
}

function KPIRow({ items }: { items: MarketKPIs[] }) {
  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={(_, i) => String(i)}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: spacing.lg }}
      renderItem={({ item }) => <KPICard item={item} />}
      style={s.kpiList}
    />
  );
}

function SectionTitle({ title, right }: { title: string; right?: string }) {
  return (
    <View style={s.sectionHeader}>
      <Text style={s.sectionTitle}>{title}</Text>
      {right && <Text style={s.sectionRight}>{right}</Text>}
    </View>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <View style={s.card}>{children}</View>;
}

// ─── Developer Bar Chart ────────────────────────────────────────────────────

function DeveloperChart({ data, title }: { data: DeveloperRow[]; title?: string }) {
  const maxVal = Math.max(...data.map((d) => d.valueNum));
  return (
    <Card>
      <SectionTitle title={title || 'Top Master Projects'} right="BY VALUE" />
      {data.map((d, i) => (
        <View key={i} style={s.devRow}>
          <Text style={[s.devName, d.name.startsWith('Other') && { color: colors.textSecondary }]} numberOfLines={1}>
            {d.name}
          </Text>
          <View style={s.devBarWrap}>
            <View
              style={[s.devBar, { width: `${(d.valueNum / maxVal) * 100}%`, backgroundColor: d.color }]}
            />
          </View>
          <Text style={s.devVal}>{d.value}</Text>
          <Text style={s.devPct}>{d.pct}%</Text>
        </View>
      ))}
    </Card>
  );
}

// ─── Area Table ─────────────────────────────────────────────────────────────

function AreaTable({ data }: { data: AreaRow[] }) {
  const maxVal = Math.max(...data.map((a) => a.valueNum));
  return (
    <Card>
      <SectionTitle title="Top Locations" right="BY VALUE" />
      {/* Header */}
      <View style={s.tblHeaderRow}>
        <Text style={[s.tblH, { flex: 1.5 }]}># Area</Text>
        <Text style={[s.tblH, { flex: 1, textAlign: 'right' }]}>Value</Text>
        <Text style={[s.tblH, { width: 50, textAlign: 'right' }]}>Txns</Text>
        <Text style={[s.tblH, { width: 65, textAlign: 'right' }]}>Avg</Text>
      </View>
      {data.map((a) => (
        <View key={a.rank} style={s.tblRow}>
          <View style={{ flex: 1.5, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={s.areaRank}>{String(a.rank).padStart(2, '0')}</Text>
            <Text style={s.areaName} numberOfLines={1}>{a.area}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={s.areaVal}>{a.value}</Text>
            <View style={[s.inlineBar, { width: (a.valueNum / maxVal) * 60 }]} />
          </View>
          <Text style={[s.areaMuted, { width: 50, textAlign: 'right' }]}>{a.txns}</Text>
          <Text style={[s.areaMuted, { width: 65, textAlign: 'right' }]}>{a.avg}</Text>
        </View>
      ))}
    </Card>
  );
}

// ─── Projects List ──────────────────────────────────────────────────────────

function ProjectsList({ data }: { data: ProjectRow[] }) {
  return (
    <Card>
      <SectionTitle title="Top Projects" right="BY VALUE" />
      {data.map((p, i) => (
        <View key={i} style={[s.projRow, i === data.length - 1 && { borderBottomWidth: 0 }]}>
          <View style={{ flex: 1, marginRight: spacing.sm }}>
            <Text style={s.projName}>{p.name}</Text>
            <Text style={s.projMeta}>{p.developer} · {p.location}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.projVal}>{p.value}</Text>
            <Text style={s.projTxn}>{p.txns} txns</Text>
          </View>
        </View>
      ))}
    </Card>
  );
}

// ─── Unit Mix ───────────────────────────────────────────────────────────────

function UnitMixChart({ data, valueSplit }: { data: UnitMixRow[]; valueSplit?: ValueSplit[] }) {
  const maxCount = Math.max(...data.map((u) => u.count));
  return (
    <Card>
      <SectionTitle title="Unit Mix" right="BY BEDROOM TYPE" />
      {data.map((u, i) => (
        <View key={i} style={s.mixRow}>
          <Text style={s.mixLabel}>{u.type}</Text>
          <View style={s.mixBarWrap}>
            <View style={[s.mixBar, { width: `${(u.count / maxCount) * 100}%`, backgroundColor: u.color }]} />
          </View>
          <Text style={s.mixVal}>{u.count} · {u.pct}%</Text>
        </View>
      ))}
      {valueSplit && valueSplit.length > 0 && (
        <View style={s.splitRow}>
          {valueSplit.map((vs, i) => (
            <View key={i} style={s.splitCard}>
              <Text style={s.splitLabel}>{vs.label}</Text>
              <Text style={[s.splitValue, { color: vs.color }]}>{vs.value}</Text>
              <Text style={s.splitMeta}>{vs.units} · {vs.pct}</Text>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}

// ─── Market Signals ─────────────────────────────────────────────────────────

function SignalsCard({ data }: { data: MarketSignal[] }) {
  return (
    <Card>
      <SectionTitle title="Market Signals" />
      {data.map((sig, i) => (
        <View key={i} style={[s.sigBlock, i === data.length - 1 && { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }]}>
          <Text style={[s.sigTitle, { color: sig.color }]}>{sig.title}</Text>
          <Text style={s.sigBody}>{sig.body}</Text>
        </View>
      ))}
    </Card>
  );
}

// ─── Metro Table (USA) ──────────────────────────────────────────────────────

function MetroTable({ data }: { data: MetroRow[] }) {
  return (
    <Card>
      <SectionTitle title="Metro Markets" right="KEY INDICATORS" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header */}
          <View style={[s.tblHeaderRow, { minWidth: 520 }]}>
            <Text style={[s.tblH, { width: 90 }]}>City</Text>
            <Text style={[s.tblH, { width: 90, textAlign: 'right' }]}>Median</Text>
            <Text style={[s.tblH, { width: 80, textAlign: 'right' }]}>YoY</Text>
            <Text style={[s.tblH, { width: 80, textAlign: 'right' }]}>Inventory</Text>
            <Text style={[s.tblH, { width: 80, textAlign: 'right' }]}>Temp</Text>
          </View>
          {data.map((m, i) => (
            <View key={i} style={[s.tblRow, { minWidth: 520 }]}>
              <Text style={[s.areaName, { width: 90 }]}>{m.city}</Text>
              <Text style={[s.areaVal, { width: 90, textAlign: 'right' }]}>{m.medianPrice}</Text>
              <Text style={[s.areaVal, { width: 80, textAlign: 'right', color: m.changeColor }]}>{m.yoyChange}</Text>
              <Text style={[s.areaMuted, { width: 80, textAlign: 'right' }]}>{m.inventory}</Text>
              <Text style={[s.areaMuted, { width: 80, textAlign: 'right', fontWeight: '600' }]}>{m.temp}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Card>
  );
}

// ─── Skeleton ───────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <View style={{ gap: spacing.sm, marginVertical: spacing.lg }}>
      <View style={[s.skelBar, { width: '100%' }]} />
      <View style={[s.skelBar, { width: '70%' }]} />
      <View style={[s.skelBar, { width: '85%' }]} />
    </View>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN SCREEN
// ═══════════════════════════════════════════════════════════════════════════════

export default function RETransactionsScreen() {
  const route = useRoute<{ key: string; name: string; params?: { tab?: string } }>();
  const initialTab = route.params?.tab || 'Dubai';

  const [activeTab, setActiveTab] = useState(initialTab);

  // Filters
  const [timeline, setTimeline] = useState('All');
  const [txnType, setTxnType] = useState('All');
  const [propType, setPropType] = useState('All');

  // Data
  const [dubaiLive, setDubaiLive] = useState<DubaiLiveData | null>(null);
  const [abuDhabiLive, setAbuDhabiLive] = useState<AbuDhabiLiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dubaiSource, setDubaiSource] = useState<'dataset' | 'estimated'>('dataset');
  const [adSource, setAdSource] = useState<'dataset' | 'estimated'>('estimated');

  // CSV upload states
  const [dubaiParsed, setDubaiParsed] = useState<DubaiParsedData | null>(null);
  const [dubaiUploading, setDubaiUploading] = useState(false);
  const [dubaiLastUpload, setDubaiLastUpload] = useState<string | null>(null);
  const [adParsed, setAdParsed] = useState<AbuDhabiParsedData | null>(null);
  const [adUploading, setAdUploading] = useState(false);
  const [adLastUpload, setAdLastUpload] = useState<string | null>(null);

  // Load persisted data on mount
  useEffect(() => {
    (async () => {
      try {
        const [dubaiStored, adStored] = await Promise.all([
          AsyncStorage.getItem(DUBAI_STORAGE_KEY),
          AsyncStorage.getItem(AD_STORAGE_KEY),
        ]);
        if (dubaiStored) {
          const { csv, uploadedAt } = JSON.parse(dubaiStored);
          setDubaiParsed(parseDubaiCSV(csv));
          setDubaiSource('dataset');
          setDubaiLastUpload(uploadedAt);
        }
        if (adStored) {
          const { csv, uploadedAt } = JSON.parse(adStored);
          setAdParsed(parseAbuDhabiCSV(csv));
          setAdSource('dataset');
          setAdLastUpload(uploadedAt);
        }
      } catch { /* ignore */ }
    })();
  }, []);

  // Generic CSV upload handler
  const handleCSVUpload = useCallback(async (
    market: 'dubai' | 'abudhabi',
  ) => {
    const setUploading = market === 'dubai' ? setDubaiUploading : setAdUploading;
    try {
      setUploading(true);
      const result = await DocumentPicker.getDocumentAsync({ type: ['text/csv', 'text/comma-separated-values', 'application/vnd.ms-excel', '*/*'], copyToCacheDirectory: true });
      if (result.canceled || !result.assets?.[0]) { setUploading(false); return; }
      const file = result.assets[0];

      let csvText: string;
      if (Platform.OS === 'web') {
        const resp = await fetch(file.uri);
        csvText = await resp.text();
      } else {
        csvText = await FileSystem.readAsStringAsync(file.uri);
      }

      const uploadedAt = new Date().toISOString();

      if (market === 'dubai') {
        setDubaiParsed(parseDubaiCSV(csvText));
        setDubaiSource('dataset');
        setDubaiLastUpload(uploadedAt);
        await AsyncStorage.setItem(DUBAI_STORAGE_KEY, JSON.stringify({ csv: csvText, uploadedAt }));
      } else {
        setAdParsed(parseAbuDhabiCSV(csvText));
        setAdSource('dataset');
        setAdLastUpload(uploadedAt);
        await AsyncStorage.setItem(AD_STORAGE_KEY, JSON.stringify({ csv: csvText, uploadedAt }));
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      Alert.alert('Upload Error', msg);
    } finally {
      setUploading(false);
    }
  }, []);

  const loadData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const [d, ad] = await Promise.all([
        fetchDubaiLiveData(),
        fetchAbuDhabiLiveData(),
      ]);

      setDubaiLive(d);
      setDubaiSource(d.source);
      setAbuDhabiLive(ad);
      if (!adParsed) setAdSource(ad.source);
      if (!dubaiParsed) setDubaiSource(d.source);
    } catch {
      // keep fallback
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [adParsed, dubaiParsed]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    await loadData(true);
  }, [loadData]);

  // ── Filtered data (all sections re-slice when CSV uploaded) ──

  const dubaiFiltered = useMemo(() => {
    if (!dubaiParsed) return null;
    return filterDubaiData(dubaiParsed, propType, txnType, timeline);
  }, [dubaiParsed, propType, txnType, timeline]);

  const adFiltered = useMemo(() => {
    if (!adParsed) return null;
    return filterAbuDhabiData(adParsed, propType, txnType, timeline);
  }, [adParsed, propType, txnType, timeline]);

  // Fallback filter for static data (when no CSV uploaded)
  const filterProjects = useCallback((projects: ProjectRow[]) => {
    return projects.filter((p) => {
      if (propType !== 'All' && p.propType && p.propType !== propType) return false;
      if (txnType !== 'All' && p.txnType && p.txnType !== txnType) return false;
      return true;
    });
  }, [propType, txnType]);

  const hasActiveFilter = propType !== 'All' || txnType !== 'All' || timeline !== 'All';

  // ── Render helpers ──

  const renderFilters = () => {
    const showTxnType = activeTab !== 'USA';
    return (
      <View style={s.filtersWrap}>
        <FilterSection label="Period" options={TIMELINE_OPTIONS} active={timeline} onSelect={setTimeline} />
        {showTxnType && (
          <FilterSection label="Type" options={TXN_TYPES} active={txnType} onSelect={setTxnType} />
        )}
        <FilterSection label="Property" options={PROP_TYPES} active={propType} onSelect={setPropType} />
        {hasActiveFilter && (
          <View style={s.filterBanner}>
            <Text style={s.filterBannerText}>
              Filtered: {[timeline !== 'All' && timeline, txnType !== 'All' && txnType, propType !== 'All' && propType].filter(Boolean).join(' · ')}
            </Text>
            <Pressable onPress={() => { setTimeline('All'); setTxnType('All'); setPropType('All'); }}>
              <Text style={s.filterClear}>Clear</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  const renderMarketHeader = (title: string, source: 'dataset' | 'estimated') => (
    <View style={s.marketHeader}>
      <View>
        <Text style={s.marketTitle}>{title}</Text>
        <View style={s.badgeRow}>
          <View style={s.dateBadge}>
            <Text style={s.dateBadgeText}>{DEFAULT_DATE_RANGE}</Text>
          </View>
        </View>
      </View>
      <SourcePill source={source} />
    </View>
  );

  const renderDubai = () => {
    const d = dubaiFiltered;
    // Use CSV-filtered data first, then precomputed fallback, then static imports
    const precomp = !d ? getDubaiPrecomputed(propType, txnType) : null;
    const kpis = d ? d.kpis : precomp ? precomp.kpis : DUBAI_KPIS;
    const devs = d ? d.developers : precomp ? precomp.developers : DUBAI_DEVELOPERS;
    const areasData = d ? d.areas : precomp ? precomp.areas : DUBAI_AREAS;
    const projs = d ? d.projects : precomp ? precomp.projects : filterProjects(DUBAI_PROJECTS);
    const mix = d ? d.unitMix : precomp ? precomp.unitMix : DUBAI_UNIT_MIX;
    const split = d ? d.valueSplit : precomp ? precomp.valueSplit : DUBAI_VALUE_SPLIT;
    const sigs = d ? d.signals : precomp ? precomp.signals : DUBAI_SIGNALS;
    const dateStr = d ? d.dateRange : precomp ? precomp.dateRange : DEFAULT_DATE_RANGE;

    return (
      <>
        <View style={s.marketHeader}>
          <View>
            <Text style={s.marketTitle}>Dubai Transactions</Text>
            <View style={s.badgeRow}>
              <View style={s.dateBadge}>
                <Text style={s.dateBadgeText}>{dateStr}</Text>
              </View>
              {dubaiLastUpload && (
                <Text style={s.uploadMeta}> · Uploaded {new Date(dubaiLastUpload).toLocaleDateString()}</Text>
              )}
            </View>
          </View>
          <SourcePill source={dubaiParsed ? dubaiSource : 'dataset'} />
        </View>

        <Pressable onPress={() => handleCSVUpload('dubai')} style={s.uploadCard}>
          {dubaiUploading ? (
            <ActivityIndicator size="small" color={colors.blueIcon} />
          ) : (
            <>
              <Text style={s.uploadIcon}>📄</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.uploadTitle}>{dubaiParsed ? 'Update Dubai Data' : 'Upload Dubai CSV'}</Text>
                <Text style={s.uploadSub}>
                  {dubaiParsed
                    ? `${dubaiParsed.totalTxns.toLocaleString()} transactions loaded · Tap to replace`
                    : 'Upload DLD transactions CSV to populate dashboard'}
                </Text>
              </View>
              <Text style={s.uploadArrow}>↑</Text>
            </>
          )}
        </Pressable>

        <KPIRow items={kpis} />
        {devs.length > 0 && <DeveloperChart data={devs} />}
        {areasData.length > 0 && <AreaTable data={areasData} />}
        {projs.length > 0 ? <ProjectsList data={projs} /> : hasActiveFilter ? <Card><Text style={s.emptyText}>No projects match the selected filters</Text></Card> : null}
        {mix.length > 0 && <UnitMixChart data={mix} valueSplit={split} />}
        {sigs.length > 0 && <SignalsCard data={sigs} />}
      </>
    );
  };

  const renderAbuDhabi = () => {
    const d = adFiltered;
    // Use CSV-filtered data first, then precomputed fallback, then static imports
    const precomp = !d ? getAbuDhabiPrecomputed(propType, txnType) : null;
    const kpis = d ? d.kpis : precomp ? precomp.kpis : ABU_DHABI_KPIS;
    const devs = d ? d.developers : precomp ? precomp.developers : ABU_DHABI_DEVELOPERS;
    const areasData = d ? d.areas : precomp ? precomp.areas : ABU_DHABI_AREAS;
    const mix = d ? d.unitMix : precomp ? precomp.unitMix : ABU_DHABI_UNIT_MIX;
    const sigs = d ? d.signals : precomp ? precomp.signals : ABU_DHABI_SIGNALS;
    const dateStr = d ? d.dateRange : precomp ? precomp.dateRange : DEFAULT_DATE_RANGE;

    return (
      <>
        {/* Header with upload button */}
        <View style={s.marketHeader}>
          <View>
            <Text style={s.marketTitle}>Abu Dhabi Transactions</Text>
            <View style={s.badgeRow}>
              <View style={s.dateBadge}>
                <Text style={s.dateBadgeText}>{dateStr}</Text>
              </View>
              {adLastUpload && (
                <Text style={s.uploadMeta}> · Uploaded {new Date(adLastUpload).toLocaleDateString()}</Text>
              )}
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <SourcePill source={adSource} />
          </View>
        </View>

        {/* Upload card */}
        <Pressable onPress={() => handleCSVUpload('abudhabi')} style={s.uploadCard}>
          {adUploading ? (
            <ActivityIndicator size="small" color={colors.blueIcon} />
          ) : (
            <>
              <Text style={s.uploadIcon}>📄</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.uploadTitle}>{adParsed ? 'Update Abu Dhabi Data' : 'Upload Abu Dhabi CSV'}</Text>
                <Text style={s.uploadSub}>
                  {adParsed
                    ? `${adParsed.totalTxns.toLocaleString()} transactions loaded · Tap to replace`
                    : 'Upload Quanta search results CSV to populate dashboard'}
                </Text>
              </View>
              <Text style={s.uploadArrow}>↑</Text>
            </>
          )}
        </Pressable>

        <KPIRow items={kpis} />
        {devs.length > 0 && <DeveloperChart data={devs} title="Developer Breakdown" />}
        {areasData.length > 0 && <AreaTable data={areasData} />}
        {(() => {
          const projs = d ? d.projects : precomp ? precomp.projects : filterProjects(ABU_DHABI_PROJECTS);
          if (projs.length > 0) return <ProjectsList data={projs} />;
          if (hasActiveFilter) return <Card><Text style={s.emptyText}>No projects match the selected filters</Text></Card>;
          return null;
        })()}
        {mix.length > 0 && <UnitMixChart data={mix} />}
        {sigs.length > 0 && <SignalsCard data={sigs} />}
      </>
    );
  };

  const renderUSA = () => (
    <>
      {renderMarketHeader('US Housing Market', 'estimated')}
      <KPIRow items={USA_KPIS} />
      <MetroTable data={USA_METROS} />
      <SignalsCard data={USA_SIGNALS} />
    </>
  );

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={colors.textSecondary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={s.wrapper} edges={['bottom']}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
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
        <AppHeader title="Transaction Dashboard" />

        {/* Filters */}
        {renderFilters()}

        {/* Market tabs */}
        <TabBarRow tabs={MARKET_TABS} active={activeTab} onSelect={setActiveTab} />

        {/* Market content */}
        {activeTab === 'Dubai' && renderDubai()}
        {activeTab === 'Abu Dhabi' && renderAbuDhabi()}
        {activeTab === 'USA' && renderUSA()}
      </ScrollView>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.pageBg },
  wrapper: { flex: 1, backgroundColor: colors.pageBg },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: 40 },

  // ── Source pill ──
  pill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
  pillDot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  pillLabel: { fontSize: fontSize.xxs, fontWeight: '600' },

  // ── Filters ──
  filtersWrap: { marginBottom: spacing.md },
  filterGroup: { marginBottom: spacing.sm },
  filterGroupLabel: { fontSize: fontSize.xxs, fontWeight: '600', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, marginLeft: 2 },
  filterRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  filterPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.cardBg },
  filterPillActive: { backgroundColor: colors.textPrimary, borderColor: colors.textPrimary },
  filterPillText: { fontSize: fontSize.xs, fontWeight: '500', color: colors.textSecondary },
  filterPillTextActive: { color: colors.textWhite },

  // ── Market header ──
  marketHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: spacing.lg, marginBottom: spacing.md },
  marketTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.textPrimary, marginBottom: 6 },
  badgeRow: { flexDirection: 'row' },
  dateBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 3, backgroundColor: colors.blueBg, borderWidth: 1, borderColor: 'rgba(55,138,221,0.2)' },
  dateBadgeText: { fontSize: fontSize.xxs, fontWeight: '500', color: colors.blueText, letterSpacing: 0.5 },

  // ── KPI ──
  kpiList: { marginBottom: spacing.md },
  kpiCard: { backgroundColor: colors.cardBg, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: 14, marginRight: 10, width: 150, borderTopWidth: 2, borderTopColor: colors.blueIcon },
  kpiLabel: { fontSize: 9, fontWeight: '600', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 6 },
  kpiValue: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.textPrimary, lineHeight: 26 },
  kpiSub: { fontSize: fontSize.xxs, color: colors.textSecondary, marginTop: 3 },

  // ── Card ──
  card: { backgroundColor: colors.cardBg, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },

  // ── Section title ──
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionTitle: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1.5 },
  sectionRight: { fontSize: 9, color: colors.blueIcon, fontWeight: '500', letterSpacing: 1 },

  // ── Developer chart ──
  devRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7, gap: 8 },
  devName: { width: 90, fontSize: fontSize.xs, fontWeight: '500', color: colors.textPrimary },
  devBarWrap: { flex: 1, height: 6, backgroundColor: colors.tertiaryBg, borderRadius: 2, overflow: 'hidden' },
  devBar: { height: '100%', borderRadius: 2 },
  devVal: { width: 70, fontSize: fontSize.xs, fontWeight: '600', color: colors.blueIcon, textAlign: 'right' },
  devPct: { width: 38, fontSize: fontSize.xxs, color: colors.textSecondary, textAlign: 'right' },

  // ── Area table ──
  tblHeaderRow: { flexDirection: 'row', alignItems: 'center', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: colors.border, marginBottom: 4 },
  tblH: { fontSize: 9, fontWeight: '500', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8 },
  tblRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  areaRank: { fontSize: fontSize.xxs, color: colors.textSecondary, marginRight: 6, fontWeight: '500', width: 18 },
  areaName: { fontSize: fontSize.xs, fontWeight: '500', color: colors.textPrimary },
  areaVal: { fontSize: fontSize.xs, fontWeight: '600', color: colors.blueIcon },
  areaMuted: { fontSize: fontSize.xs, color: colors.textSecondary },
  inlineBar: { height: 3, backgroundColor: colors.blueIcon, opacity: 0.3, borderRadius: 1, marginTop: 2 },

  // ── Projects ──
  projRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  projName: { fontSize: fontSize.md, fontWeight: '600', color: colors.textPrimary },
  projMeta: { fontSize: fontSize.xxs, color: colors.textSecondary, marginTop: 2 },
  projVal: { fontSize: fontSize.md, fontWeight: '600', color: colors.blueIcon },
  projTxn: { fontSize: fontSize.xxs, color: colors.textSecondary, marginTop: 2 },

  // ── Unit mix ──
  mixRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7, gap: 8 },
  mixLabel: { width: 60, fontSize: fontSize.xs, fontWeight: '500', color: colors.textPrimary },
  mixBarWrap: { flex: 1, height: 8, backgroundColor: colors.tertiaryBg, borderRadius: 2, overflow: 'hidden' },
  mixBar: { height: '100%', borderRadius: 2 },
  mixVal: { width: 70, fontSize: fontSize.xxs, color: colors.textSecondary, textAlign: 'right' },

  // ── Value split ──
  splitRow: { flexDirection: 'row', gap: 10, marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border },
  splitCard: { flex: 1, backgroundColor: colors.tertiaryBg, padding: 10, borderRadius: radius.sm },
  splitLabel: { fontSize: fontSize.xxs, color: colors.textSecondary, marginBottom: 4 },
  splitValue: { fontSize: fontSize.xl, fontWeight: '700' },
  splitMeta: { fontSize: fontSize.xxs, color: colors.textSecondary, marginTop: 2 },

  // ── Signals ──
  sigBlock: { marginBottom: 12, paddingBottom: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  sigTitle: { fontSize: fontSize.xxs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  sigBody: { fontSize: fontSize.sm, color: colors.textPrimary, lineHeight: 18 },

  // ── Filter banner ──
  filterBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.blueBg, paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.sm, marginTop: 4 },
  filterBannerText: { fontSize: fontSize.xs, fontWeight: '600', color: colors.blueText },
  filterClear: { fontSize: fontSize.xs, fontWeight: '600', color: colors.blueIcon, textDecorationLine: 'underline' },

  // ── Filter count ──
  filterCountRow: { paddingVertical: 10, paddingHorizontal: 4, marginBottom: spacing.sm },
  filterCountText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.blueIcon },

  // ── Upload card ──
  uploadCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.cardBg, borderWidth: 1, borderColor: colors.blueIcon, borderStyle: 'dashed', borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md },
  uploadIcon: { fontSize: 24 },
  uploadTitle: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textPrimary },
  uploadSub: { fontSize: fontSize.xxs, color: colors.textSecondary, marginTop: 2 },
  uploadArrow: { fontSize: 18, fontWeight: '700', color: colors.blueIcon },
  uploadMeta: { fontSize: fontSize.xxs, color: colors.textSecondary },

  // ── Empty state ──
  emptyText: { fontSize: fontSize.sm, color: colors.textSecondary, textAlign: 'center' as const, paddingVertical: spacing.lg },

  // ── Skeleton ──
  skelBar: { height: 14, borderRadius: radius.sm, backgroundColor: colors.border },
});
