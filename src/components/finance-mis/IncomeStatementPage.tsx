import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { incomeStatementInsights, incomeStatementKpis, incomeStatementRows, type IncomeStatementRow } from '../../data/financeMis';
import { formatAEDCompact } from '../../utils/financeMis';
import { FinanceKPIGrid, FinancePanel, FinanceTable, InsightStripRow, type FinanceTableColumn, type FinanceTableRowStyle } from './FinanceMISShared';
import { financePageStyles as styles } from './pageStyles';

export function IncomeStatementPage() {
  const columns: FinanceTableColumn<IncomeStatementRow>[] = [
    {
      key: 'label',
      label: 'Particulars',
      width: 280,
      render: (row) => (
        <Text
          style={[
            styles.labelCell,
            row.indent ? styles.indentedLabel : null,
            row.emphasis ? styles.emphasisLabel : null,
            row.emphasis === 'grand' ? styles.grandLabel : null,
          ]}
        >
          {row.label}
        </Text>
      ),
    },
    {
      key: 'plannedFY26',
      label: 'Planned FY26',
      width: 150,
      align: 'right',
      render: (row) => (
        <Text
          style={[
            styles.numericCell,
            row.emphasis ? styles.emphasisCell : null,
            row.emphasis === 'grand' ? styles.grandCellText : null,
          ]}
        >
          {formatAEDCompact(row.plannedFY26)}
        </Text>
      ),
    },
    {
      key: 'plannedYtd',
      label: 'Planned YTD Feb 26',
      width: 170,
      align: 'right',
      render: (row) => (
        <Text
          style={[
            styles.numericCell,
            row.emphasis ? styles.emphasisCell : null,
            row.emphasis === 'grand' ? styles.grandCellText : null,
          ]}
        >
          {formatAEDCompact(row.plannedYtd)}
        </Text>
      ),
    },
    {
      key: 'actualYtd',
      label: 'Actual YTD Feb 26',
      width: 170,
      align: 'right',
      render: (row) => (
        <Text
          style={[
            styles.numericCell,
            row.emphasis ? styles.emphasisCell : null,
            row.emphasis === 'grand' ? styles.grandCellText : null,
            row.actualYtd !== null && row.actualYtd < 0 && row.emphasis !== 'grand'
              ? styles.negativeText
              : null,
          ]}
        >
          {formatAEDCompact(row.actualYtd)}
        </Text>
      ),
    },
    {
      key: 'revenuePct',
      label: '% Revenue',
      width: 100,
      align: 'right',
      render: (row) => (
        <Text
          style={[
            styles.mutedCell,
            row.emphasis ? styles.emphasisCell : null,
            row.emphasis === 'grand' ? styles.grandPctText : null,
          ]}
        >
          {row.revenuePct || '-'}
        </Text>
      ),
    },
  ];

  return (
    <View>
      <FinanceKPIGrid items={incomeStatementKpis} />
      <InsightStripRow items={incomeStatementInsights} />

      <FinancePanel
        title="Income statement"
        meta="Planned versus actual values shown in compact AED format."
      >
        <FinanceTable
          columns={columns}
          rows={incomeStatementRows}
          getRowKey={(row) => row.label}
          getRowStyle={getIncomeRowStyle}
        />
      </FinancePanel>
    </View>
  );
}

function getIncomeRowStyle(row: IncomeStatementRow): FinanceTableRowStyle | undefined {
  switch (row.emphasis) {
    case 'subtotal':
      return { backgroundColor: colors.secondaryBg, fontWeight: '700' };
    case 'total':
      return { backgroundColor: colors.tertiaryBg, fontWeight: '700' };
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
