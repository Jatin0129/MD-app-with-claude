import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../theme/colors';
import { inventoryInsights, inventoryKpis, inventoryProjects, type InventoryProject } from '../../data/financeMis';
import { formatAEDCompact, formatPlainNumber, toPercent } from '../../utils/financeMis';
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

type InventorySortKey = 'unsold' | 'sold' | 'rate';

interface InventoryRow extends InventoryProject {
  unsold: number;
}

export function UnsoldInventoryPage() {
  const [sortBy, setSortBy] = useState<InventorySortKey>('unsold');

  const inventoryRows = useMemo<InventoryRow[]>(
    () =>
      inventoryProjects.map((project) => ({
        ...project,
        unsold: project.topline - project.sales,
      })),
    [],
  );

  const sortedRows = useMemo(() => {
    const rows = [...inventoryRows];

    if (sortBy === 'sold') {
      rows.sort((left, right) => left.soldPct - right.soldPct);
      return rows;
    }

    if (sortBy === 'rate') {
      rows.sort((left, right) => right.ratePerSft - left.ratePerSft);
      return rows;
    }

    rows.sort((left, right) => right.unsold - left.unsold);
    return rows;
  }, [inventoryRows, sortBy]);

  const totalTopline = inventoryRows.reduce((sum, row) => sum + row.topline, 0);
  const totalSales = inventoryRows.reduce((sum, row) => sum + row.sales, 0);
  const totalUnsold = totalTopline - totalSales;

  const columns: FinanceTableColumn<InventoryRow>[] = [
    {
      key: 'project',
      label: 'Project',
      width: 220,
      render: (row) => <Text style={styles.labelCell}>{row.project}</Text>,
    },
    {
      key: 'community',
      label: 'Community',
      width: 150,
      render: (row) => <Text style={styles.mutedCell}>{row.community}</Text>,
    },
    {
      key: 'topline',
      label: 'Topline',
      width: 130,
      align: 'right',
      render: (row) => <Text style={styles.numericCell}>{formatAEDCompact(row.topline)}</Text>,
    },
    {
      key: 'sales',
      label: 'Sales',
      width: 130,
      align: 'right',
      render: (row) => <Text style={styles.numericCell}>{formatAEDCompact(row.sales)}</Text>,
    },
    {
      key: 'unsold',
      label: 'Unsold',
      width: 130,
      align: 'right',
      render: (row) => (
        <Text style={[styles.numericCell, unsoldValueStyle(row.unsold)]}>
          {formatAEDCompact(row.unsold)}
        </Text>
      ),
    },
    {
      key: 'soldPct',
      label: 'Sold %',
      width: 150,
      render: (row) => (
        <View style={styles.progressCell}>
          <FinanceProgressBar value={row.soldPct} tone={soldPctTone(row.soldPct)} />
          <Text style={[styles.progressLabel, soldPctTextStyle(row.soldPct)]}>
            {toPercent(row.soldPct)}
          </Text>
        </View>
      ),
    },
    {
      key: 'ratePerSft',
      label: 'Rate/sft',
      width: 95,
      align: 'right',
      render: (row) => <Text style={styles.numericCell}>{formatPlainNumber(row.ratePerSft)}</Text>,
    },
  ];

  return (
    <View>
      <FinanceKPIGrid items={inventoryKpis} />
      <InsightStripRow items={inventoryInsights} />

      <FinancePanel
        title="Unsold inventory"
        meta="Sorted view of the highest-value or lowest-absorption pools."
        right={<InventorySortPills active={sortBy} onChange={setSortBy} />}
      >
        <FinanceTable
          columns={columns}
          rows={sortedRows}
          getRowKey={(row) => row.project}
          getRowStyle={getInventoryRowStyle}
          footer={
            <View style={localStyles.inventoryFooter}>
              <Text style={localStyles.footerTitle}>Portfolio total</Text>
              <View style={localStyles.footerMetrics}>
                <Text style={localStyles.footerMetric}>Topline {formatAEDCompact(totalTopline)}</Text>
                <Text style={localStyles.footerMetric}>Sales {formatAEDCompact(totalSales)}</Text>
                <Text style={localStyles.footerMetric}>Unsold {formatAEDCompact(totalUnsold)}</Text>
              </View>
            </View>
          }
        />
      </FinancePanel>
    </View>
  );
}

function InventorySortPills({
  active,
  onChange,
}: {
  active: InventorySortKey;
  onChange: (value: InventorySortKey) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={localStyles.sortPillRow}>
        <SortPill label="By unsold value" active={active === 'unsold'} onPress={() => onChange('unsold')} />
        <SortPill label="By sold %" active={active === 'sold'} onPress={() => onChange('sold')} />
        <SortPill label="By rate/sft" active={active === 'rate'} onPress={() => onChange('rate')} />
      </View>
    </ScrollView>
  );
}

function SortPill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[localStyles.sortPill, active ? localStyles.sortPillActive : null]}
    >
      <Text style={[localStyles.sortPillText, active ? localStyles.sortPillTextActive : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function getInventoryRowStyle(row: InventoryRow): FinanceTableRowStyle | undefined {
  if (row.unsold >= 3000000000) {
    return { backgroundColor: colors.amberBg };
  }

  if (row.soldPct <= 10) {
    return { backgroundColor: colors.redBg };
  }

  return undefined;
}

function soldPctTone(value: number): 'green' | 'amber' | 'red' {
  if (value >= 75) {
    return 'green';
  }

  if (value >= 35) {
    return 'amber';
  }

  return 'red';
}

function soldPctTextStyle(value: number) {
  if (value >= 75) {
    return styles.positiveText;
  }

  if (value >= 35) {
    return styles.warningText;
  }

  return styles.negativeText;
}

function unsoldValueStyle(value: number) {
  if (value >= 3000000000) {
    return styles.negativeText;
  }

  if (value >= 1000000000) {
    return styles.warningText;
  }

  return styles.mutedNumericCell;
}

const localStyles = StyleSheet.create({
  inventoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
    flexWrap: 'wrap',
  },
  footerTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  footerMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  footerMetric: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  sortPillRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sortPill: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardBg,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  sortPillActive: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
  },
  sortPillText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sortPillTextActive: {
    color: colors.textWhite,
  },
});
