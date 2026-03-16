import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type TextStyle,
} from 'react-native';
import { colors, fontSize, radius, spacing } from '../../theme/colors';
import type { FinanceInsight, FinanceInsightTone, FinanceKPI } from '../../data/financeMis';
import { clampPercent } from '../../utils/financeMis';

type TableAlign = 'left' | 'right' | 'center';

export interface FinanceTableColumn<Row> {
  key: string;
  label: string;
  width: number;
  align?: TableAlign;
  render: (row: Row) => React.ReactNode;
}

export interface FinanceTableRowStyle {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  fontWeight?: TextStyle['fontWeight'];
}

interface FinancePanelProps {
  title: string;
  meta?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}

interface FinanceKPIGridProps {
  items: FinanceKPI[];
}

interface InsightStripRowProps {
  items: FinanceInsight[];
}

interface FinanceProgressBarProps {
  value: number;
  tone?: FinanceInsightTone;
  trackColor?: string;
}

interface FinanceTableProps<Row> {
  columns: FinanceTableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => string;
  getRowStyle?: (row: Row, index: number) => FinanceTableRowStyle | undefined;
  footer?: React.ReactNode;
}

const toneMap: Record<FinanceInsightTone, { bg: string; text: string; value: string }> = {
  neutral: { bg: colors.cardBg, text: colors.textSecondary, value: colors.textPrimary },
  green: { bg: colors.greenBg, text: colors.greenText, value: colors.positiveGreen },
  amber: { bg: colors.amberBg, text: colors.amberText, value: colors.amberColor },
  red: { bg: colors.redBg, text: colors.redText, value: colors.negativeRed },
  blue: { bg: colors.blueBg, text: colors.blueText, value: colors.blueText },
};

export function FinanceKPIGrid({ items }: FinanceKPIGridProps) {
  const { width } = useWindowDimensions();
  const itemWidth = width >= 1180 ? '19%' : width >= 768 ? '31.33%' : '48%';

  return (
    <View style={styles.kpiGrid}>
      {items.map((item) => {
        const tone = toneMap[item.tone || 'neutral'];
        return (
          <View
            key={item.label}
            style={[
              styles.kpiCard,
              {
                width: itemWidth,
                backgroundColor: tone.bg,
              },
            ]}
          >
            <Text style={styles.kpiLabel}>{item.label}</Text>
            <Text style={[styles.kpiValue, { color: tone.value }]}>{item.value}</Text>
            {item.sublabel ? (
              <Text style={[styles.kpiSublabel, { color: tone.text }]}>{item.sublabel}</Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

export function InsightStripRow({ items }: InsightStripRowProps) {
  const { width } = useWindowDimensions();
  const itemWidth = width >= 960 ? '32.2%' : '100%';

  return (
    <View style={styles.insightRow}>
      {items.map((item, index) => {
        const tone = toneMap[item.tone || 'neutral'];
        return (
          <View
            key={`${item.text}-${index}`}
            style={[
              styles.insightCard,
              {
                width: itemWidth,
                backgroundColor: tone.bg,
              },
            ]}
          >
            <Text style={[styles.insightText, { color: tone.text }]}>{item.text}</Text>
          </View>
        );
      })}
    </View>
  );
}

export function FinancePanel({ title, meta, right, children }: FinancePanelProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHeaderLeft}>
          <Text style={styles.panelTitle}>{title}</Text>
          {meta ? <Text style={styles.panelMeta}>{meta}</Text> : null}
        </View>
        {right ? <View style={styles.panelHeaderRight}>{right}</View> : null}
      </View>
      {children}
    </View>
  );
}

export function FinanceProgressBar({
  value,
  tone = 'neutral',
  trackColor = colors.border,
}: FinanceProgressBarProps) {
  const barTone = toneMap[tone];

  return (
    <View style={[styles.progressTrack, { backgroundColor: trackColor }]}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${clampPercent(value)}%`,
            backgroundColor: barTone.value,
          },
        ]}
      />
    </View>
  );
}

export function FinanceTable<Row>({
  columns,
  rows,
  getRowKey,
  getRowStyle,
  footer,
}: FinanceTableProps<Row>) {
  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View>
          <View style={styles.tableHeaderRow}>
            {columns.map((column) => (
              <View
                key={column.key}
                style={[
                  styles.tableHeaderCell,
                  { width: column.width, alignItems: mapAlign(column.align) },
                ]}
              >
                <Text style={[styles.tableHeaderText, textAlign(column.align)]}>{column.label}</Text>
              </View>
            ))}
          </View>

          {rows.map((row, index) => {
            const rowStyle = getRowStyle?.(row, index);
            return (
              <View
                key={getRowKey(row, index)}
                style={[
                  styles.tableRow,
                  {
                    backgroundColor:
                      rowStyle?.backgroundColor || (index % 2 === 0 ? colors.cardBg : colors.secondaryBg),
                    borderBottomColor: rowStyle?.borderColor || colors.border,
                  },
                ]}
              >
                {columns.map((column) => (
                  <View
                    key={column.key}
                    style={[
                      styles.tableCell,
                      { width: column.width, alignItems: mapAlign(column.align) },
                    ]}
                  >
                    {renderCellContent(
                      column.render(row),
                      [
                        styles.tableCellText,
                        textAlign(column.align),
                        rowStyle?.fontWeight ? { fontWeight: rowStyle.fontWeight } : null,
                        rowStyle?.textColor ? { color: rowStyle.textColor } : null,
                      ],
                    )}
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {footer ? <View style={styles.tableFooter}>{footer}</View> : null}
    </>
  );
}

function mapAlign(align: TableAlign | undefined): 'flex-start' | 'flex-end' | 'center' {
  if (align === 'right') {
    return 'flex-end';
  }

  if (align === 'center') {
    return 'center';
  }

  return 'flex-start';
}

function textAlign(align: TableAlign | undefined): TextStyle {
  return { textAlign: align || 'left' };
}

function renderCellContent(
  content: React.ReactNode,
  textStyles: Array<TextStyle | null>,
) {
  if (typeof content === 'string' || typeof content === 'number') {
    return <Text style={textStyles}>{content}</Text>;
  }

  if (content === null || content === undefined || typeof content === 'boolean') {
    return <Text style={textStyles}>-</Text>;
  }

  return content;
}

const styles = StyleSheet.create({
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.sm,
    marginBottom: spacing.lg,
  },
  kpiCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  kpiLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  kpiValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  kpiSublabel: {
    fontSize: fontSize.sm,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
  insightRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.sm,
    marginBottom: spacing.lg,
  },
  insightCard: {
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  insightText: {
    fontSize: fontSize.md,
    lineHeight: 20,
    fontWeight: '500',
  },
  panel: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  panelHeader: {
    backgroundColor: colors.secondaryBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  panelHeaderLeft: {
    flex: 1,
  },
  panelHeaderRight: {
    flexShrink: 1,
  },
  panelTitle: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  panelMeta: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  progressTrack: {
    width: 76,
    height: 6,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.pill,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: colors.secondaryBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableHeaderCell: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    justifyContent: 'center',
  },
  tableHeaderText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tableCell: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    justifyContent: 'center',
  },
  tableCellText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  tableFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.secondaryBg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
});
