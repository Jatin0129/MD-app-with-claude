import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import * as XLSX from 'xlsx';

import { colors } from '../theme/colors';
import {
  COLLECTIONS_MIS_UNIT_LABEL,
  formatCollectionsAmount,
  formatCollectionsPercent,
  formatCollectionsTimestamp,
} from '../utils/collectionsMisFormatters';
import { parseCollectionsMISWorkbook } from '../utils/collectionsMisParser';
import {
  COLLECTIONS_ENTITIES,
  type CollectionsEntity,
  type CollectionsMISRow,
  type CollectionsMISWorkbookData,
  type PersistedCollectionsMISState,
} from '../utils/collectionsMisTypes';

const STORAGE_KEY = 'collections-mis:last-upload:v1';
const TABLE_HEIGHT = 500;
const TABLE_WIDTHS = {
  particular: 320,
  metric: 150,
};

async function readWorkbook(file: DocumentPicker.DocumentPickerAsset): Promise<XLSX.WorkBook> {
  if (Platform.OS === 'web' && file.file) {
    const buffer = await file.file.arrayBuffer();
    return XLSX.read(buffer, { type: 'array', cellFormula: true });
  }

  const base64 = await FileSystem.readAsStringAsync(file.uri, { encoding: 'base64' });
  return XLSX.read(base64, { type: 'base64', cellFormula: true });
}

function stickyColumn(left: number, zIndex: number) {
  return {
    position: 'sticky',
    left,
    zIndex,
  } as any;
}

function KPIBox({ title, value, note }: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <View style={styles.kpiCard}>
      <Text style={styles.kpiTitle}>{title}</Text>
      <Text style={styles.kpiValue}>{value}</Text>
      <Text style={styles.kpiNote}>{note}</Text>
    </View>
  );
}

function TableRow({ row, index }: { row: CollectionsMISRow; index: number }) {
  const alt = index % 2 === 1;
  const stickyBg = alt ? styles.stickyAlt : styles.stickyBase;

  return (
    <View style={[styles.tableRow, alt && styles.altRow]}>
      <Text
        style={[
          styles.cell,
          styles.particularCell,
          stickyBg,
          Platform.OS === 'web' ? stickyColumn(0, 3) : null,
          Platform.OS === 'web' ? styles.particularSticky : null,
        ]}
      >
        {row.particular}
      </Text>
      <Text style={[styles.cell, styles.metricCell]}>{formatCollectionsAmount(row.dtd)}</Text>
      <Text style={[styles.cell, styles.metricCell]}>{formatCollectionsAmount(row.mtd)}</Text>
      <Text style={[styles.cell, styles.metricCell, styles.metricStrong]}>{formatCollectionsAmount(row.ytd)}</Text>
    </View>
  );
}

export default function DailyCollectionsMISScreen() {
  const { width } = useWindowDimensions();
  const [activeEntity, setActiveEntity] = useState<CollectionsEntity>('Sobha LLC');
  const [data, setData] = useState<CollectionsMISWorkbookData | null>(null);
  const [fileName, setFileName] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);

  const visibleRows = useMemo(
    () => (data?.rows ?? []).filter((row) => row.entity === activeEntity),
    [data, activeEntity],
  );

  const activeTotal = data?.totals[activeEntity];
  const activeSummary = data?.summary.entities[activeEntity];
  const tableMinWidth = Math.max(width - 32, 780);
  const lastUpdatedLabel = updatedAt ? formatCollectionsTimestamp(updatedAt) : 'No upload yet';

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (!storedValue || !isMounted) {
          return;
        }

        const parsedValue = JSON.parse(storedValue) as PersistedCollectionsMISState;
        setData({
          rows: parsedValue.rows,
          totals: parsedValue.totals,
          summary: parsedValue.summary,
        });
        setFileName(parsedValue.fileName);
        setUpdatedAt(parsedValue.updatedAt);
      } catch {
        // Ignore corrupted local cache and allow a fresh upload.
      } finally {
        if (isMounted) {
          setIsHydrating(false);
        }
      }
    }

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  const persistState = useCallback(async (nextState: PersistedCollectionsMISState) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }, []);

  const handleUpload = useCallback(async () => {
    try {
      setIsParsing(true);
      setErrorMessage('');

      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.[0]) {
        return;
      }

      const file = result.assets[0];
      const workbook = await readWorkbook(file);
      const parsedData = parseCollectionsMISWorkbook(workbook);
      const nextUpdatedAt = new Date().toISOString();

      setData(parsedData);
      setFileName(file.name);
      setUpdatedAt(nextUpdatedAt);

      await persistState({
        ...parsedData,
        fileName: file.name,
        updatedAt: nextUpdatedAt,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to parse this Collections MIS workbook.';
      setErrorMessage(message);
    } finally {
      setIsParsing(false);
    }
  }, [persistState]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.tabRow}>
        {COLLECTIONS_ENTITIES.map((entity) => {
          const isActive = entity === activeEntity;
          return (
            <TouchableOpacity
              key={entity}
              activeOpacity={0.82}
              onPress={() => setActiveEntity(entity)}
              style={[styles.tab, isActive && styles.tabActive]}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{entity}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Collections MIS workspace</Text>
        <Text style={styles.heroTitle}>{activeEntity}</Text>
        <Text style={styles.heroText}>
          {fileName
            ? `${fileName} is cached locally, so the last uploaded collections workbook stays available when this page is reopened.`
            : 'Upload the daily collections workbook once and keep the latest parsed view available on this device.'}
        </Text>
        <View style={styles.heroChipRow}>
          <View style={styles.heroChip}>
            <Ionicons name="time-outline" size={14} color={colors.aiBodyText} />
            <Text style={styles.heroChipText}>Last updated {lastUpdatedLabel}</Text>
          </View>
          <View style={styles.heroChip}>
            <Ionicons name="save-outline" size={14} color={colors.aiBodyText} />
            <Text style={styles.heroChipText}>{data ? 'Saved locally' : 'Waiting for first upload'}</Text>
          </View>
        </View>
      </View>

      {data ? (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Collection Summary</Text>
          <View style={styles.summaryHeader}>
            <Text style={[styles.summaryHeaderText, styles.summaryLabelCell]}>Amount (Mil AED)</Text>
            <Text style={[styles.summaryHeaderText, styles.summaryValueCell]}>Sobha LLC</Text>
            <Text style={[styles.summaryHeaderText, styles.summaryValueCell]}>Siniya Island</Text>
            <Text style={[styles.summaryHeaderText, styles.summaryValueCell]}>Downtown UAQ</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, styles.summaryLabelCell]}>MTD Collection</Text>
            <Text style={styles.summaryValueCell}>{formatCollectionsAmount(data.summary.entities['Sobha LLC'].mtd)}</Text>
            <Text style={styles.summaryValueCell}>{formatCollectionsAmount(data.summary.entities['Siniya Island'].mtd)}</Text>
            <Text style={styles.summaryValueCell}>{formatCollectionsAmount(data.summary.entities['Downtown UAQ'].mtd)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, styles.summaryLabelCell]}>YTD Collection</Text>
            <Text style={styles.summaryValueCell}>{formatCollectionsAmount(data.summary.entities['Sobha LLC'].ytd)}</Text>
            <Text style={styles.summaryValueCell}>{formatCollectionsAmount(data.summary.entities['Siniya Island'].ytd)}</Text>
            <Text style={styles.summaryValueCell}>{formatCollectionsAmount(data.summary.entities['Downtown UAQ'].ytd)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryHighlight]}>
            <Text style={[styles.summaryLabel, styles.summaryLabelCell, styles.summaryHighlightText]}>Total Collection YTD</Text>
            <Text style={[styles.summaryHighlightValue, styles.summarySpanValue]}>{formatCollectionsAmount(data.summary.totalCollectionYtd)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, styles.summaryLabelCell]}>% Collection</Text>
            <Text style={styles.summaryValueCell}>{formatCollectionsPercent(data.summary.entities['Sobha LLC'].pctCollection)}</Text>
            <Text style={styles.summaryValueCell}>{formatCollectionsPercent(data.summary.entities['Siniya Island'].pctCollection)}</Text>
            <Text style={styles.summaryValueCell}>{formatCollectionsPercent(data.summary.entities['Downtown UAQ'].pctCollection)}</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.kpiGrid}>
        <KPIBox
          title="Particulars"
          value={String(visibleRows.length)}
          note={activeEntity}
        />
        <KPIBox
          title="DTD"
          value={`AED ${formatCollectionsAmount(activeTotal?.dtd ?? 0)} mn`}
          note={`Updated ${lastUpdatedLabel}`}
        />
        <KPIBox
          title="MTD"
          value={`AED ${formatCollectionsAmount(activeSummary?.mtd ?? activeTotal?.mtd ?? 0)} mn`}
          note="Current month"
        />
        <KPIBox
          title="YTD"
          value={`AED ${formatCollectionsAmount(activeSummary?.ytd ?? activeTotal?.ytd ?? 0)} mn`}
          note="Year to date"
        />
      </View>

      <View style={styles.uploadCard}>
        <Text style={styles.uploadTitle}>Daily Collections MIS</Text>
        <Text style={styles.uploadSubtitle}>
          {fileName
            ? `Loaded from ${fileName}`
            : 'Upload the daily Collections MIS workbook to populate the summary and particulars table.'}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Ionicons name="calendar-outline" size={14} color={colors.textPrimary} />
            <Text style={styles.metaChipText}>Last updated {lastUpdatedLabel}</Text>
          </View>
          {data ? (
            <View style={styles.metaChip}>
              <Ionicons name="grid-outline" size={14} color={colors.textPrimary} />
              <Text style={styles.metaChipText}>{data.rows.length} particulars cached</Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          activeOpacity={0.82}
          onPress={handleUpload}
          style={styles.uploadButton}
          disabled={isParsing}
        >
          <Ionicons name="cloud-upload-outline" size={16} color={colors.textWhite} />
          <Text style={styles.uploadButtonText}>{isParsing ? 'Parsing...' : fileName ? 'Replace file' : 'Upload file'}</Text>
        </TouchableOpacity>

        <Text style={styles.unitText}>{COLLECTIONS_MIS_UNIT_LABEL}</Text>

        {errorMessage ? (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle-outline" size={14} color={colors.negativeRed} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>

      {isHydrating ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Loading saved Collections MIS</Text>
          <Text style={styles.emptyText}>Checking whether a previously uploaded collections workbook is already stored on this device.</Text>
        </View>
      ) : !data ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No file uploaded yet</Text>
          <Text style={styles.emptyText}>Upload the daily Collections MIS workbook to see the collection summary and particulars table.</Text>
        </View>
      ) : (
        <View style={styles.tableCard}>
          <View style={styles.tableToolbar}>
            <Text style={styles.tableTitle}>{activeEntity} particulars</Text>
            <Text style={styles.tableNote}>The total row stays on top, the header stays fixed, and on web the Particulars column stays pinned.</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.tableCanvas, { minWidth: tableMinWidth }]}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text
                  style={[
                    styles.headerCell,
                    styles.particularCell,
                    styles.headerSticky,
                    Platform.OS === 'web' ? stickyColumn(0, 6) : null,
                    Platform.OS === 'web' ? styles.particularSticky : null,
                  ]}
                >
                  Particulars
                </Text>
                <Text style={[styles.headerCell, styles.metricCell]}>DTD</Text>
                <Text style={[styles.headerCell, styles.metricCell]}>MTD</Text>
                <Text style={[styles.headerCell, styles.metricCell]}>YTD</Text>
              </View>

              {activeTotal ? (
                <View style={[styles.tableRow, styles.totalRow]}>
                  <Text
                  style={[
                      styles.totalCell,
                      styles.particularCell,
                      styles.totalSticky,
                      Platform.OS === 'web' ? stickyColumn(0, 6) : null,
                      Platform.OS === 'web' ? styles.particularStickyDark : null,
                    ]}
                  >
                    {activeTotal.label}
                  </Text>
                  <Text style={[styles.totalCell, styles.metricCell]}>{formatCollectionsAmount(activeTotal.dtd)}</Text>
                  <Text style={[styles.totalCell, styles.metricCell]}>{formatCollectionsAmount(activeTotal.mtd)}</Text>
                  <Text style={[styles.totalCell, styles.metricCell]}>{formatCollectionsAmount(activeTotal.ytd)}</Text>
                </View>
              ) : null}

              <ScrollView
                style={styles.tableBody}
                nestedScrollEnabled
                showsVerticalScrollIndicator
              >
                {visibleRows.map((row, index) => (
                  <TableRow key={`${row.entity}-${row.particular}-${index}`} row={row} index={index} />
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.pageBg,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 44,
    gap: 14,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardBg,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  tabTextActive: {
    color: colors.textWhite,
  },
  heroCard: {
    backgroundColor: colors.aiPanelBg,
    borderRadius: 22,
    padding: 18,
    gap: 10,
  },
  heroEyebrow: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.aiChipText,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textWhite,
  },
  heroText: {
    fontSize: 13,
    lineHeight: 21,
    color: colors.aiBodyText,
  },
  heroChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  heroChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.aiChipBg,
    borderWidth: 0.5,
    borderColor: colors.aiChipBorder,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  heroChipText: {
    fontSize: 11,
    color: colors.aiBodyText,
  },
  summaryCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  summaryTitle: {
    backgroundColor: '#0f2c6a',
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 12,
  },
  summaryHeader: {
    flexDirection: 'row',
    backgroundColor: colors.secondaryBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryHeaderText: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.tertiaryBg,
  },
  summaryHighlight: {
    backgroundColor: '#0f2c6a',
  },
  summaryLabelCell: {
    width: '45%',
  },
  summaryValueCell: {
    width: '18.333%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  summaryLabel: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  summaryHighlightText: {
    color: colors.textWhite,
  },
  summaryHighlightValue: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textWhite,
    textAlign: 'center',
  },
  summarySpanValue: {
    width: '55%',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  kpiCard: {
    width: '48%',
    minWidth: 180,
    flexGrow: 1,
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 4,
  },
  kpiTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  kpiValue: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  kpiNote: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  uploadCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  uploadTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  uploadSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.secondaryBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  metaChipText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.textPrimary,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  uploadButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textWhite,
  },
  unitText: {
    fontSize: 11,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: colors.redBg,
    borderRadius: 14,
    padding: 12,
  },
  errorText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: colors.redText,
  },
  emptyCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  emptyText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  tableCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  tableToolbar: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.cardBg,
    gap: 4,
  },
  tableTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  tableNote: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  tableCanvas: {
    backgroundColor: colors.cardBg,
  },
  tableBody: {
    maxHeight: TABLE_HEIGHT,
  },
  tableHeader: {
    backgroundColor: colors.secondaryBg,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  altRow: {
    backgroundColor: '#fafaf9',
  },
  headerCell: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.9,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerSticky: {
    backgroundColor: colors.secondaryBg,
  },
  particularSticky: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 3, height: 0 },
  },
  particularStickyDark: {
    backgroundColor: colors.textPrimary,
    borderRightWidth: 1,
    borderRightColor: '#2f2f35',
  },
  totalRow: {
    backgroundColor: colors.textPrimary,
  },
  totalCell: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontSize: 12,
    fontWeight: '700',
    color: colors.textWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.textPrimary,
  },
  totalSticky: {
    backgroundColor: colors.textPrimary,
  },
  cell: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    fontSize: 12,
    color: colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.tertiaryBg,
  },
  stickyBase: {
    backgroundColor: colors.cardBg,
  },
  stickyAlt: {
    backgroundColor: '#fafaf9',
  },
  particularCell: {
    width: TABLE_WIDTHS.particular,
  },
  metricCell: {
    width: TABLE_WIDTHS.metric,
    textAlign: 'right',
  },
  metricStrong: {
    fontWeight: '600',
  },
});
