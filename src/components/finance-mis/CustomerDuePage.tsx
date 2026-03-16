import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../theme/colors';
import { customerDueInsights, customerDueProjects, type CustomerDueProject, type FinanceKPI } from '../../data/financeMis';
import { formatAEDCompact } from '../../utils/financeMis';
import {
  FinanceKPIGrid,
  FinancePanel,
  FinanceProgressBar,
  FinanceTable,
  InsightStripRow,
  type FinanceTableColumn,
  type FinanceTableRowStyle,
} from './FinanceMISShared';
import { financePageStyles as styles } from './pageStyles';

interface CustomerDueRow extends CustomerDueProject {
  total: number;
  critical: number;
  criticalPct: number;
}

interface BucketTotals {
  bucket0To30: number;
  bucket31To60: number;
  bucket61To90: number;
  bucket91To120: number;
  bucket121To180: number;
  bucket181To360: number;
  bucketOver360: number;
}

export function CustomerDuePage() {
  const customerDueRows = useMemo<CustomerDueRow[]>(
    () =>
      customerDueProjects.map((project) => {
        const total =
          project.bucket0To30 +
          project.bucket31To60 +
          project.bucket61To90 +
          project.bucket91To120 +
          project.bucket121To180 +
          project.bucket181To360 +
          project.bucketOver360;
        const critical = project.bucket121To180 + project.bucket181To360 + project.bucketOver360;

        return {
          ...project,
          total,
          critical,
          criticalPct: total > 0 ? (critical / total) * 100 : 0,
        };
      }),
    [],
  );

  const bucketTotals = customerDueRows.reduce<BucketTotals>(
    (totals, row) => ({
      bucket0To30: totals.bucket0To30 + row.bucket0To30,
      bucket31To60: totals.bucket31To60 + row.bucket31To60,
      bucket61To90: totals.bucket61To90 + row.bucket61To90,
      bucket91To120: totals.bucket91To120 + row.bucket91To120,
      bucket121To180: totals.bucket121To180 + row.bucket121To180,
      bucket181To360: totals.bucket181To360 + row.bucket181To360,
      bucketOver360: totals.bucketOver360 + row.bucketOver360,
    }),
    {
      bucket0To30: 0,
      bucket31To60: 0,
      bucket61To90: 0,
      bucket91To120: 0,
      bucket121To180: 0,
      bucket181To360: 0,
      bucketOver360: 0,
    },
  );

  const totalOverdue =
    bucketTotals.bucket0To30 +
    bucketTotals.bucket31To60 +
    bucketTotals.bucket61To90 +
    bucketTotals.bucket91To120 +
    bucketTotals.bucket121To180 +
    bucketTotals.bucket181To360 +
    bucketTotals.bucketOver360;

  const dueKpis: FinanceKPI[] = [
    { label: 'Total overdue', value: formatAEDCompact(totalOverdue), tone: 'red' },
    { label: '0-30 days', value: formatAEDCompact(bucketTotals.bucket0To30), tone: 'green' },
    {
      label: '31-90 days',
      value: formatAEDCompact(bucketTotals.bucket31To60 + bucketTotals.bucket61To90),
      tone: 'amber',
    },
    {
      label: '121-360 days',
      value: formatAEDCompact(bucketTotals.bucket121To180 + bucketTotals.bucket181To360),
      tone: 'red',
    },
    { label: '>360 days', value: formatAEDCompact(bucketTotals.bucketOver360), tone: 'red' },
  ];

  const sortedRows = [...customerDueRows].sort((left, right) => right.total - left.total);

  const columns: FinanceTableColumn<CustomerDueRow>[] = [
    {
      key: 'project',
      label: 'Project',
      width: 180,
      render: (row) => <Text style={styles.labelCell}>{row.project}</Text>,
    },
    ...dueBucketColumns,
    {
      key: 'total',
      label: 'Total',
      width: 120,
      align: 'right',
      render: (row) => <Text style={styles.numericCell}>{formatAEDCompact(row.total)}</Text>,
    },
    {
      key: 'risk',
      label: 'Risk',
      width: 150,
      render: (row) => (
        <View style={styles.progressCell}>
          <FinanceProgressBar value={row.criticalPct} tone={riskTone(row.criticalPct)} />
          <Text style={[styles.progressLabel, riskTextStyle(row.criticalPct)]}>
            {row.criticalPct > 0 ? `${Math.round(row.criticalPct)}% critical` : 'Clean'}
          </Text>
        </View>
      ),
    },
  ];

  return (
    <View>
      <FinanceKPIGrid items={dueKpis} />
      <InsightStripRow items={customerDueInsights} />

      <FinancePanel
        title="Customer due ageing"
        meta="Risk is based on 121+ day exposure as a share of total overdue."
      >
        <BucketSummaryStrip bucketTotals={bucketTotals} />
        <FinanceTable
          columns={columns}
          rows={sortedRows}
          getRowKey={(row) => row.project}
          getRowStyle={getDueRowStyle}
          footer={
            <Text style={localStyles.criticalFooter}>
              Critical ageing {formatAEDCompact(bucketTotals.bucket121To180 + bucketTotals.bucket181To360 + bucketTotals.bucketOver360)} in 121+ day buckets
            </Text>
          }
        />
      </FinancePanel>
    </View>
  );
}

function BucketSummaryStrip({ bucketTotals }: { bucketTotals: BucketTotals }) {
  const items = [
    { label: '0-30', value: bucketTotals.bucket0To30, tone: localStyles.bucketToneGreen },
    { label: '31-60', value: bucketTotals.bucket31To60, tone: localStyles.bucketToneNeutral },
    { label: '61-90', value: bucketTotals.bucket61To90, tone: localStyles.bucketToneAmber },
    { label: '91-120', value: bucketTotals.bucket91To120, tone: localStyles.bucketToneAmber },
    { label: '121-180', value: bucketTotals.bucket121To180, tone: localStyles.bucketToneRed },
    { label: '181-360', value: bucketTotals.bucket181To360, tone: localStyles.bucketToneRed },
    { label: '>360', value: bucketTotals.bucketOver360, tone: localStyles.bucketToneDeepRed },
  ];

  return (
    <View style={localStyles.bucketStrip}>
      {items.map((item) => (
        <View key={item.label} style={localStyles.bucketCard}>
          <Text style={localStyles.bucketLabel}>{item.label}</Text>
          <Text style={[localStyles.bucketValue, item.tone]}>{formatAEDCompact(item.value)}</Text>
        </View>
      ))}
    </View>
  );
}

function formatBucketValue(value: number) {
  return value > 0 ? formatAEDCompact(value) : '-';
}

function getDueRowStyle(row: CustomerDueRow): FinanceTableRowStyle | undefined {
  if (row.criticalPct >= 65) {
    return { backgroundColor: colors.redBg };
  }

  if (row.criticalPct >= 35) {
    return { backgroundColor: colors.amberBg };
  }

  return undefined;
}

function riskTone(value: number): 'green' | 'amber' | 'red' {
  if (value <= 30) {
    return 'green';
  }

  if (value <= 60) {
    return 'amber';
  }

  return 'red';
}

function riskTextStyle(value: number) {
  if (value <= 30) {
    return styles.positiveText;
  }

  if (value <= 60) {
    return styles.warningText;
  }

  return styles.negativeText;
}

const dueBucketColumns: FinanceTableColumn<CustomerDueRow>[] = [
  {
    key: 'bucket0To30',
    label: '0-30',
    width: 95,
    align: 'right',
    render: (row) => <Text style={styles.numericCell}>{formatBucketValue(row.bucket0To30)}</Text>,
  },
  {
    key: 'bucket31To60',
    label: '31-60',
    width: 95,
    align: 'right',
    render: (row) => <Text style={styles.numericCell}>{formatBucketValue(row.bucket31To60)}</Text>,
  },
  {
    key: 'bucket61To90',
    label: '61-90',
    width: 95,
    align: 'right',
    render: (row) => <Text style={styles.numericCell}>{formatBucketValue(row.bucket61To90)}</Text>,
  },
  {
    key: 'bucket91To120',
    label: '91-120',
    width: 95,
    align: 'right',
    render: (row) => <Text style={styles.numericCell}>{formatBucketValue(row.bucket91To120)}</Text>,
  },
  {
    key: 'bucket121To180',
    label: '121-180',
    width: 105,
    align: 'right',
    render: (row) => (
      <Text style={[styles.numericCell, styles.agedBucketText]}>
        {formatBucketValue(row.bucket121To180)}
      </Text>
    ),
  },
  {
    key: 'bucket181To360',
    label: '181-360',
    width: 105,
    align: 'right',
    render: (row) => (
      <Text style={[styles.numericCell, styles.agedBucketText]}>
        {formatBucketValue(row.bucket181To360)}
      </Text>
    ),
  },
  {
    key: 'bucketOver360',
    label: '>360',
    width: 95,
    align: 'right',
    render: (row) => (
      <Text style={[styles.numericCell, styles.deepAgedBucketText]}>
        {formatBucketValue(row.bucketOver360)}
      </Text>
    ),
  },
];

const localStyles = StyleSheet.create({
  bucketStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  bucketCard: {
    minWidth: 110,
    flexGrow: 1,
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  bucketLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  bucketValue: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  criticalFooter: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.redText,
  },
  bucketToneGreen: {
    color: colors.positiveGreen,
  },
  bucketToneNeutral: {
    color: colors.textPrimary,
  },
  bucketToneAmber: {
    color: colors.amberColor,
  },
  bucketToneRed: {
    color: colors.negativeRed,
  },
  bucketToneDeepRed: {
    color: colors.redText,
  },
});
