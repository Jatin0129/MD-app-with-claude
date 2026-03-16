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
  formatSalesMisAmount,
  formatSalesMisTimestamp,
  SALES_MIS_UNIT_LABEL,
} from '../utils/salesMisFormatters';
import { parseSalesMISWorkbook } from '../utils/salesMisParser';
import {
  SALES_ENTITIES,
  type PersistedSalesMISState,
  type SalesEntity,
  type SalesMISRow,
} from '../utils/salesMisTypes';

const STORAGE_KEY = 'sales-mis:last-upload:v1';
const TABLE_HEIGHT = 560;
const TABLE_WIDTHS = {
  community: 240,
  project: 250,
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

function KPIBox({ title, value, note, tone = 'default' }: {
  title: string;
  value: string;
  note: string;
  tone?: 'default' | 'positive';
}) {
  return (
    <View style={styles.kpiCard}>
      <Text style={styles.kpiTitle}>{title}</Text>
      <Text style={styles.kpiValue}>{value}</Text>
      <Text style={[styles.kpiNote, tone === 'positive' && styles.kpiNotePositive]}>{note}</Text>
    </View>
  );
}

function TableRow({
  row,
  index,
}: {
  row: SalesMISRow;
  index: number;
}) {
  const alt = index % 2 === 1;
  const stickyBg = alt ? styles.stickyAlt : styles.stickyBase;

  return (
    <View style={[styles.tableRow, alt && styles.altRow]}>
      <Text
        style={[
          styles.cell,
          styles.communityCell,
        ]}
        numberOfLines={2}
      >
        {row.community}
      </Text>
      <Text
        style={[
          styles.cell,
          styles.projectCell,
          stickyBg,
          Platform.OS === 'web' ? webStickyColumn(0, 4) : null,
          Platform.OS === 'web' ? styles.projectSticky : null,
        ]}
        numberOfLines={2}
      >
        {row.project}
      </Text>
      <Text style={[styles.cell, styles.metricCell]}>{formatSalesMisAmount(row.dtd)}</Text>
      <Text style={[styles.cell, styles.metricCell]}>{formatSalesMisAmount(row.mtd)}</Text>
      <Text style={[styles.cell, styles.metricCell, styles.metricStrong]}>{formatSalesMisAmount(row.ytd)}</Text>
    </View>
  );
}

function webStickyColumn(left: number, zIndex: number) {
  return {
    position: 'sticky',
    left,
    zIndex,
  } as any;
}

export default function DailySalesMISScreen() {
  const { width } = useWindowDimensions();
  const [activeEntity, setActiveEntity] = useState<SalesEntity>('Sobha LLC');
  const [rows, setRows] = useState<SalesMISRow[]>([]);
  const [fileName, setFileName] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);

  const visibleRows = useMemo(
    () => rows.filter((row) => row.entity === activeEntity),
    [rows, activeEntity],
  );

  const entitySummary = useMemo(() => {
    const communities = new Set<string>();
    const totals = visibleRows.reduce(
      (acc, row) => {
        communities.add(row.community);
        acc.dtd += row.dtd;
        acc.mtd += row.mtd;
        acc.ytd += row.ytd;
        return acc;
      },
      { dtd: 0, mtd: 0, ytd: 0 },
    );

    return {
      projectCount: visibleRows.length,
      communityCount: communities.size,
      ...totals,
    };
  }, [visibleRows]);

  const tableMinWidth = Math.max(width - 32, 940);
  const lastUpdatedLabel = updatedAt ? formatSalesMisTimestamp(updatedAt) : 'No upload yet';

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (!storedValue || !isMounted) {
          return;
        }

        const parsedValue = JSON.parse(storedValue) as PersistedSalesMISState;
        setRows(parsedValue.rows ?? []);
        setFileName(parsedValue.fileName ?? '');
        setUpdatedAt(parsedValue.updatedAt ?? '');
      } catch {
        // Ignore bad local cache and allow a fresh upload.
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

  const persistState = useCallback(async (nextState: PersistedSalesMISState) => {
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
      const parsedRows = parseSalesMISWorkbook(workbook);
      const nextUpdatedAt = new Date().toISOString();

      setRows(parsedRows);
      setFileName(file.name);
      setUpdatedAt(nextUpdatedAt);

      await persistState({
        fileName: file.name,
        rows: parsedRows,
        updatedAt: nextUpdatedAt,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to parse this Sales MIS workbook.';
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
        {SALES_ENTITIES.map((entity) => {
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
        <Text style={styles.heroEyebrow}>Sales MIS workspace</Text>
        <Text style={styles.heroTitle}>{activeEntity}</Text>
        <Text style={styles.heroText}>
          {fileName
            ? `${fileName} is loaded locally and will remain available when you reopen this page.`
            : 'Upload the standard daily Excel MIS workbook once and the latest parsed data will stay available on this device.'}
        </Text>

        <View style={styles.heroChipRow}>
          <View style={styles.heroChip}>
            <Ionicons name="time-outline" size={14} color={colors.aiBodyText} />
            <Text style={styles.heroChipText}>Last updated {lastUpdatedLabel}</Text>
          </View>
          <View style={styles.heroChip}>
            <Ionicons name="save-outline" size={14} color={colors.aiBodyText} />
            <Text style={styles.heroChipText}>{rows.length > 0 ? 'Saved locally' : 'Waiting for first upload'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.kpiGrid}>
        <KPIBox
          title="Projects"
          value={String(entitySummary.projectCount)}
          note={`${entitySummary.communityCount} communities`}
        />
        <KPIBox
          title="Sales Date To Date"
          value={`AED ${formatSalesMisAmount(entitySummary.dtd)} mn`}
          note={activeEntity}
        />
        <KPIBox
          title="Month To Date"
          value={`AED ${formatSalesMisAmount(entitySummary.mtd)} mn`}
          note={updatedAt ? `Updated ${lastUpdatedLabel}` : 'Awaiting workbook'}
        />
        <KPIBox
          title="Year To Date"
          value={`AED ${formatSalesMisAmount(entitySummary.ytd)} mn`}
          note="Source of truth: uploaded MIS"
          tone="positive"
        />
      </View>

      <View style={styles.uploadCard}>
        <View style={styles.uploadHeader}>
          <View style={styles.uploadCopy}>
            <Text style={styles.uploadTitle}>Daily Sales MIS</Text>
            <Text style={styles.uploadSubtitle}>
              {fileName
                ? `Loaded from ${fileName}`
                : 'Upload the standard daily Excel MIS workbook to populate this table.'}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Ionicons name="calendar-outline" size={14} color={colors.textPrimary} />
              <Text style={styles.metaChipText}>Last updated {lastUpdatedLabel}</Text>
            </View>
            {rows.length > 0 ? (
              <View style={styles.metaChip}>
                <Ionicons name="grid-outline" size={14} color={colors.textPrimary} />
                <Text style={styles.metaChipText}>{rows.length} total rows cached</Text>
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
        </View>

        <Text style={styles.unitText}>{SALES_MIS_UNIT_LABEL}</Text>

        {errorMessage ? (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle-outline" size={14} color={colors.negativeRed} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>

      {isHydrating ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Loading saved Sales MIS</Text>
          <Text style={styles.emptyText}>Checking whether a previously uploaded workbook is already stored on this device.</Text>
        </View>
      ) : rows.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No file uploaded yet</Text>
          <Text style={styles.emptyText}>
            Upload the daily Sales MIS workbook to view Community, Project, Sales date to date, Month to date, and Year to date.
          </Text>
        </View>
      ) : visibleRows.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No rows found for {activeEntity}</Text>
          <Text style={styles.emptyText}>This workbook did not return any project rows for the selected tab.</Text>
        </View>
      ) : (
        <View style={styles.tableCard}>
          <View style={styles.tableToolbar}>
            <Text style={styles.tableTitle}>{activeEntity} table</Text>
            <Text style={styles.tableNote}>Header stays fixed while you scroll. On web, the Project column stays pinned for easier reading.</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={[styles.tableCanvas, { minWidth: tableMinWidth }]}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text
                  style={[
                    styles.headerCell,
                    styles.communityCell,
                  ]}
                >
                  Community
                </Text>
                <Text
                  style={[
                    styles.headerCell,
                    styles.projectCell,
                    styles.headerSticky,
                    Platform.OS === 'web' ? webStickyColumn(0, 6) : null,
                    Platform.OS === 'web' ? styles.projectSticky : null,
                  ]}
                >
                  Project
                </Text>
                <Text style={[styles.headerCell, styles.metricCell]}>Sales date to date</Text>
                <Text style={[styles.headerCell, styles.metricCell]}>Month to date</Text>
                <Text style={[styles.headerCell, styles.metricCell]}>Year to date</Text>
              </View>

              <View style={[styles.tableRow, styles.totalRow]}>
                <Text
                  style={[
                    styles.totalCell,
                    styles.communityCell,
                  ]}
                >
                  Total
                </Text>
                <Text
                  style={[
                    styles.totalCell,
                    styles.projectCell,
                    styles.totalSticky,
                    Platform.OS === 'web' ? webStickyColumn(0, 6) : null,
                    Platform.OS === 'web' ? styles.projectStickyDark : null,
                  ]}
                >
                  {entitySummary.projectCount} projects
                </Text>
                <Text style={[styles.totalCell, styles.metricCell]}>{formatSalesMisAmount(entitySummary.dtd)}</Text>
                <Text style={[styles.totalCell, styles.metricCell]}>{formatSalesMisAmount(entitySummary.mtd)}</Text>
                <Text style={[styles.totalCell, styles.metricCell]}>{formatSalesMisAmount(entitySummary.ytd)}</Text>
              </View>

              <ScrollView
                style={styles.tableBody}
                nestedScrollEnabled
                showsVerticalScrollIndicator
              >
                {visibleRows.map((row, index) => (
                  <TableRow key={`${row.entity}-${row.community}-${row.project}-${index}`} row={row} index={index} />
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
    marginTop: 2,
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
  kpiNotePositive: {
    color: colors.positiveGreen,
  },
  uploadCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  uploadHeader: {
    gap: 12,
  },
  uploadCopy: {
    gap: 4,
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
  },
  headerSticky: {
    backgroundColor: colors.secondaryBg,
  },
  projectSticky: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 3, height: 0 },
  },
  projectStickyDark: {
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
  communityCell: {
    width: TABLE_WIDTHS.community,
  },
  projectCell: {
    width: TABLE_WIDTHS.project,
  },
  metricCell: {
    width: TABLE_WIDTHS.metric,
    textAlign: 'right',
  },
  metricStrong: {
    fontWeight: '600',
  },
});
