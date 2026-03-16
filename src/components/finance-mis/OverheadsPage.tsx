import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import {
  overheadInsights,
  overheadKpis,
  overheadLineItems,
  overheadTotalItems,
  type OverheadTotalItem,
} from '../../data/financeMis';
import { clampPercent, formatAEDCompact, formatSignedVariance, toPercent } from '../../utils/financeMis';
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

interface OverheadRow extends OverheadTotalItem {
  variance: number;
  utilisation?: number;
}

export function OverheadsPage() {
  const overheadRows = useMemo<OverheadRow[]>(
    () => [
      ...overheadLineItems.map((item) => ({
        ...item,
        variance: item.budgetYtd - item.actualYtd,
        utilisation: item.budgetYtd > 0 ? (item.actualYtd / item.budgetYtd) * 100 : undefined,
      })),
      ...overheadTotalItems.map((item) => ({
        ...item,
        variance: item.budgetYtd - item.actualYtd,
        utilisation: undefined,
      })),
    ],
    [],
  );

  const columns: FinanceTableColumn<OverheadRow>[] = [
    {
      key: 'description',
      label: 'Description',
      width: 280,
      render: (row) => (
        <Text
          style={[
            styles.labelCell,
            row.emphasis ? styles.emphasisLabel : null,
            row.emphasis === 'grand' ? styles.grandLabel : null,
          ]}
        >
          {row.description}
        </Text>
      ),
    },
    {
      key: 'budgetYtd',
      label: 'Budget YTD',
      width: 145,
      align: 'right',
      render: (row) => (
        <Text
          style={[
            styles.numericCell,
            row.emphasis ? styles.emphasisCell : null,
            row.emphasis === 'grand' ? styles.grandCellText : null,
          ]}
        >
          {formatAEDCompact(row.budgetYtd)}
        </Text>
      ),
    },
    {
      key: 'actualYtd',
      label: 'Actual YTD',
      width: 145,
      align: 'right',
      render: (row) => (
        <Text
          style={[
            styles.numericCell,
            row.emphasis ? styles.emphasisCell : null,
            row.emphasis === 'grand' ? styles.grandCellText : null,
          ]}
        >
          {formatAEDCompact(row.actualYtd)}
        </Text>
      ),
    },
    {
      key: 'variance',
      label: 'Variance',
      width: 130,
      align: 'right',
      render: (row) => (
        <Text
          style={[
            styles.numericCell,
            row.emphasis ? styles.emphasisCell : null,
            row.emphasis === 'grand' ? styles.grandCellText : varianceColor(row.variance),
          ]}
        >
          {formatSignedVariance(row.variance)}
        </Text>
      ),
    },
    {
      key: 'utilisation',
      label: 'Utilisation',
      width: 160,
      render: (row) =>
        row.utilisation === undefined ? (
          <Text
            style={[
              styles.mutedCell,
              row.emphasis ? styles.emphasisCell : null,
              row.emphasis === 'grand' ? styles.grandPctText : null,
            ]}
          >
            -
          </Text>
        ) : (
          <View style={styles.progressCell}>
            <FinanceProgressBar value={row.utilisation} tone={utilisationTone(row.utilisation)} />
            <Text style={[styles.progressLabel, utilisationColor(row.utilisation)]}>
              {toPercent(clampPercent(row.utilisation))}
            </Text>
          </View>
        ),
    },
  ];

  return (
    <View>
      <FinanceKPIGrid items={overheadKpis} />
      <InsightStripRow items={overheadInsights} />

      <FinancePanel
        title="Overheads"
        meta="Variance reflects budget minus actual, so positive values indicate savings."
      >
        <FinanceTable
          columns={columns}
          rows={overheadRows}
          getRowKey={(row) => row.description}
          getRowStyle={getOverheadRowStyle}
        />
      </FinancePanel>
    </View>
  );
}

function getOverheadRowStyle(row: OverheadRow): FinanceTableRowStyle | undefined {
  switch (row.emphasis) {
    case 'subtotal':
      return { backgroundColor: colors.secondaryBg, fontWeight: '700' };
    case 'total':
      return { backgroundColor: colors.tertiaryBg, fontWeight: '700' };
    case 'exception':
      return { backgroundColor: colors.redBg, fontWeight: '700' };
    case 'grand':
      return {
        backgroundColor: colors.textPrimary,
        borderColor: colors.textPrimary,
        fontWeight: '700',
      };
    default:
      return undefined;
  }
}

function utilisationTone(value: number): 'green' | 'amber' | 'red' {
  if (value <= 85) {
    return 'green';
  }

  if (value <= 100) {
    return 'amber';
  }

  return 'red';
}

function utilisationColor(value: number) {
  if (value <= 85) {
    return styles.positiveText;
  }

  if (value <= 100) {
    return styles.warningText;
  }

  return styles.negativeText;
}

function varianceColor(value: number) {
  return value >= 0 ? styles.positiveText : styles.negativeText;
}
