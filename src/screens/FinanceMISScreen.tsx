import React, { useEffect, useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { INCOME, INVENTORY, OVERDUE, OVERHEAD } from '../data/financeMISData';
import { colors } from '../theme/colors';

type FinanceTab = 'Income' | 'Overheads' | 'Inventory' | 'Overdue';

const TABS: FinanceTab[] = ['Income', 'Overheads', 'Inventory', 'Overdue'];

const INCOME_ROWS = [
  { key: 'qualifiedSales', label: 'Qualified sales' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'costOfRevenue', label: 'Cost of revenue' },
  { key: 'grossProfitBeforeBrokerage', label: 'Gross profit before brokerage' },
  { key: 'brokerage', label: 'Brokerage / commission / fees' },
  { key: 'staffIncentive', label: 'Staff incentive' },
  { key: 'dldRebate', label: 'DLD, rebate and collection charges' },
  { key: 'totalBrokerage', label: 'Total brokerage, incentives and direct costs' },
  { key: 'grossProfit', label: 'Gross profit' },
  { key: 'gnA', label: 'General and admin expenses' },
  { key: 'exGratia', label: 'Ex-gratia' },
  { key: 'depreciation', label: 'Depreciation and amortisation' },
  { key: 'misc', label: 'Miscellaneous expenses' },
  { key: 'totalGnA', label: 'Total G&A' },
  { key: 'marketing', label: 'Marketing and selling' },
  { key: 'aircraft', label: 'Aircraft' },
  { key: 'bankInterest', label: 'Interest on bank debts' },
  { key: 'fundraising', label: 'Fund raising and consultant' },
  { key: 'totalFinance', label: 'Total finance cost' },
  { key: 'royalty', label: 'Shareholder royalty' },
  { key: 'interestIncome', label: 'Interest income on FD and accounts' },
  { key: 'totalOverheads', label: 'Total overheads' },
  { key: 'netProfitBeforeOther', label: 'Net profit before other items' },
  { key: 'charity', label: 'Charity and donation' },
  { key: 'mgmtBonus26', label: 'Management bonus FY26' },
  { key: 'staffBonus26', label: 'Staff bonus FY26' },
  { key: 'mgmtBonus25', label: 'Management bonus FY25' },
  { key: 'netProfitBeforeTax', label: 'Net profit before tax' },
  { key: 'tax', label: 'Tax provision' },
  { key: 'netProfitAfterTax', label: 'Net profit after tax' },
  { key: 'alSiniyaJV', label: 'Share of profit - Al Siniya JV' },
  { key: 'uaqJV', label: 'Share of profit - UAQ Downtown JV' },
  { key: 'netProfitInclJV', label: 'Net profit incl. JV' },
] as const;

const INCOME_SUBTOTAL_KEYS = new Set([
  'grossProfitBeforeBrokerage',
  'grossProfit',
  'netProfitBeforeOther',
  'netProfitBeforeTax',
  'netProfitAfterTax',
]);

const INCOME_DEDUCTION_KEYS = new Set([
  'costOfRevenue',
  'brokerage',
  'staffIncentive',
  'dldRebate',
  'gnA',
  'exGratia',
  'depreciation',
  'misc',
  'marketing',
  'aircraft',
  'bankInterest',
  'fundraising',
  'royalty',
  'charity',
  'mgmtBonus26',
  'staffBonus26',
  'mgmtBonus25',
  'tax',
]);

const OVERHEAD_SUBTOTAL_ROWS = [
  { key: 'gnA', label: 'G&A overheads total' },
  { key: 'manpower', label: 'Manpower expenses total' },
  { key: 'corpAlloc', label: 'Corporate cost allocation' },
  { key: 'dTotal', label: 'G&A + manpower' },
  { key: 'finance', label: 'Finance cost total' },
  { key: 'marketing', label: 'Marketing and selling total' },
  { key: 'aircraft', label: 'Aircraft total' },
  { key: 'depreciation', label: 'Depreciation total' },
  { key: 'miscOH', label: 'Miscellaneous total' },
  { key: 'jTotal', label: 'Total overhead cost' },
  { key: 'charityBonus', label: 'Charity and bonus total' },
  { key: 'grandTotal', label: 'Grand total' },
] as const;

const BUCKET_META = [
  { key: 'd0', label: '0-30', color: colors.positiveGreen },
  { key: 'd1', label: '31-60', color: colors.textPrimary },
  { key: 'd2', label: '61-90', color: colors.amberColor },
  { key: 'd3', label: '91-120', color: colors.amberColor },
  { key: 'd4', label: '121-180', color: colors.negativeRed },
  { key: 'd5', label: '181-360', color: colors.negativeRed },
  { key: 'd6', label: '>361', color: colors.darkRed || '#7f1d1d' },
] as const;

export default function FinanceMISScreen() {
  const [activeTab, setActiveTab] = useState<FinanceTab>('Income');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={false} onRefresh={() => {}} tintColor={colors.textSecondary} />}
    >
      <HeaderBlock />
      <TabRow activeTab={activeTab} onChange={setActiveTab} />

      {loading ? (
        <SkeletonBlock />
      ) : (
        <>
          {activeTab === 'Income' ? <IncomeTab /> : null}
          {activeTab === 'Overheads' ? <OverheadsTab /> : null}
          {activeTab === 'Inventory' ? <InventoryTab /> : null}
          {activeTab === 'Overdue' ? <OverdueTab /> : null}
        </>
      )}
    </ScrollView>
  );
}

function HeaderBlock() {
  return (
    <View style={styles.headerWrap}>
      <Text style={styles.backLabel}>Sobha MIS</Text>
      <Text style={styles.headerTitle}>Monthly Finance MIS</Text>
      <Text style={styles.headerSub}>Feb 2026 · PNCI Group</Text>
    </View>
  );
}

function TabRow({
  activeTab,
  onChange,
}: {
  activeTab: FinanceTab;
  onChange: (tab: FinanceTab) => void;
}) {
  return (
    <View style={styles.tabRow}>
      {TABS.map((tab) => {
        const active = tab === activeTab;
        return (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.8}
            onPress={() => onChange(tab)}
            style={[styles.tabButton, active ? styles.tabButtonActive : null]}
          >
            <Text style={[styles.tabText, active ? styles.tabTextActive : null]}>{tab}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function SkeletonBlock() {
  return (
    <View style={styles.card}>
      {[0, 1, 2].map((index) => (
        <View key={index} style={styles.skeletonRow} />
      ))}
    </View>
  );
}

function KPIGrid({
  items,
}: {
  items: { label: string; value: string; tone?: string; sub?: string }[];
}) {
  return (
    <View style={styles.kpiGrid}>
      {items.map((item) => (
        <View key={item.label} style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>{item.label}</Text>
          <Text style={[styles.kpiValue, item.tone ? { color: item.tone } : null]}>{item.value}</Text>
          {item.sub ? (
            <Text style={[styles.kpiSub, item.tone ? { color: item.tone } : null]}>{item.sub}</Text>
          ) : null}
        </View>
      ))}
    </View>
  );
}

function AlertStrip({ tone, text }: { tone: 'amber' | 'red'; text: string }) {
  return (
    <View
      style={[
        styles.alertStrip,
        tone === 'amber' ? { backgroundColor: colors.amberBg } : { backgroundColor: colors.redBg },
      ]}
    >
      <Text style={[styles.alertText, tone === 'amber' ? { color: colors.amberText } : { color: colors.redText }]}>
        {text}
      </Text>
    </View>
  );
}

function TableCard({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>{children}</View>
      </ScrollView>
    </View>
  );
}

function IncomeTab() {
  const revenuePlanPct = INCOME.revenue.ytd ? Math.round((INCOME.revenue.actual / INCOME.revenue.ytd) * 100) : 0;

  return (
    <View>
      <KPIGrid
        items={[
          { label: 'Revenue', value: formatCompact(INCOME.revenue.actual), tone: colors.amberColor, sub: `${revenuePlanPct}% of plan` },
          { label: 'GrossProfit', value: INCOME.grossProfit.pct || '43.97%', tone: colors.positiveGreen },
          { label: 'NetProfit', value: formatCompact(INCOME.netProfitInclJV.actual), tone: colors.positiveGreen },
          { label: 'FinanceCost', value: formatCompact(Math.abs(INCOME.totalFinance.actual)), tone: colors.positiveGreen },
        ]}
      />

      <TableCard>
        <View style={styles.tableHeaderRow}>
          <HeaderCell label="Particulars" width={230} />
          <HeaderCell label="FY Plan" width={100} align="right" />
          <HeaderCell label="YTD Plan" width={100} align="right" />
          <HeaderCell label="Actual" width={100} align="right" />
          <HeaderCell label="%Rev" width={72} align="right" />
        </View>

        {INCOME_ROWS.map((row) => {
          const item = INCOME[row.key];
          const pct = 'pct' in item ? item.pct : undefined;
          const isSubtotal = INCOME_SUBTOTAL_KEYS.has(row.key);
          const isGrand = row.key === 'netProfitInclJV';
          const isQualified = row.key === 'qualifiedSales';
          const isDeduction = INCOME_DEDUCTION_KEYS.has(row.key);
          const rowBg = isGrand
            ? colors.textPrimary
            : isSubtotal
              ? colors.secondaryBg
              : isQualified
                ? colors.tertiaryBg
                : colors.cardBg;
          const baseColor = isGrand ? colors.textWhite : colors.textPrimary;

          return (
            <View key={row.key} style={[styles.tableRow, { backgroundColor: rowBg }]}>
              <BodyCell width={230}>
                <Text
                  style={[
                    styles.bodyText,
                    { color: isGrand ? colors.textWhite : isDeduction ? colors.textSecondary : baseColor },
                    isSubtotal || isGrand ? styles.mediumText : null,
                    isDeduction ? { paddingLeft: 18 } : null,
                  ]}
                >
                  {row.label}
                </Text>
              </BodyCell>
              <BodyCell width={100} align="right">
                <Text style={[styles.bodyText, { color: isGrand ? colors.textWhite : colors.textSecondary }]}>
                  {formatCompact(item.fy)}
                </Text>
              </BodyCell>
              <BodyCell width={100} align="right">
                <Text style={[styles.bodyText, { color: isGrand ? colors.textWhite : colors.textSecondary }]}>
                  {formatCompact(item.ytd)}
                </Text>
              </BodyCell>
              <BodyCell width={100} align="right">
                <Text
                  style={[
                    styles.bodyText,
                    {
                      color: isGrand
                        ? colors.textWhite
                        : item.actual < 0
                          ? colors.negativeRed
                          : colors.positiveGreen,
                    },
                  ]}
                >
                  {formatCompact(item.actual)}
                </Text>
              </BodyCell>
              <BodyCell width={72} align="right">
                <Text style={[styles.bodyText, { color: isGrand ? colors.textWhite : colors.textSecondary }]}>
                  {pct || '—'}
                </Text>
              </BodyCell>
            </View>
          );
        })}
      </TableCard>
    </View>
  );
}

function OverheadsTab() {
  return (
    <View>
      <KPIGrid
        items={[
          { label: 'BudgetFY', value: formatCompact(OVERHEAD.budgetFY) },
          { label: 'BudgetYTD', value: formatCompact(OVERHEAD.budgetYTD) },
          { label: 'Actual', value: formatCompact(OVERHEAD.actualYTD), tone: colors.positiveGreen, sub: `-${formatCompact(OVERHEAD.variance)}` },
          { label: 'CharityBonus', value: formatCompact(OVERHEAD.subtotals.charityBonus.act), tone: colors.negativeRed, sub: `+${formatCompact(Math.abs(OVERHEAD.subtotals.charityBonus.var))}` },
        ]}
      />
      <AlertStrip tone="amber" text="Software 404K over" />
      <AlertStrip tone="red" text="Charity 13.1M over - FY25 bonus" />

      <TableCard>
        <View style={styles.tableHeaderRow}>
          <HeaderCell label="Description" width={220} />
          <HeaderCell label="BudgetFY" width={100} align="right" />
          <HeaderCell label="BudgetYTD" width={100} align="right" />
          <HeaderCell label="Actual" width={100} align="right" />
          <HeaderCell label="Variance" width={100} align="right" />
          <HeaderCell label="Bar" width={90} />
        </View>

        <View style={styles.groupRow}>
          <Text style={styles.groupRowText}>A - General & Admin Overheads</Text>
        </View>

        {OVERHEAD.items.map((item) => {
          const ratio = item.byd > 0 ? (item.act / item.byd) * 100 : 0;
          const positive = item.var > 0;
          return (
            <View key={item.l} style={styles.tableRow}>
              <BodyCell width={220}>
                <Text style={styles.bodyText}>{item.l}</Text>
              </BodyCell>
              <BodyCell width={100} align="right">
                <Text style={[styles.bodyText, styles.secondaryText]}>{formatCompact(item.bfy)}</Text>
              </BodyCell>
              <BodyCell width={100} align="right">
                <Text style={[styles.bodyText, styles.secondaryText]}>{formatCompact(item.byd)}</Text>
              </BodyCell>
              <BodyCell width={100} align="right">
                <Text style={styles.bodyText}>{formatCompact(item.act)}</Text>
              </BodyCell>
              <BodyCell width={100} align="right">
                <View style={[styles.varianceBadge, { backgroundColor: positive ? colors.greenBg : colors.redBg }]}>
                  <Text style={[styles.varianceText, { color: positive ? colors.greenText : colors.redText }]}>
                    {item.var > 0 ? '+' : ''}{formatCompact(item.var)}
                  </Text>
                </View>
              </BodyCell>
              <BodyCell width={90}>
                <ThinBar value={ratio} color={positive ? colors.positiveGreen : colors.negativeRed} />
              </BodyCell>
            </View>
          );
        })}

        {OVERHEAD_SUBTOTAL_ROWS.map((row) => {
          const item = OVERHEAD.subtotals[row.key];
          const isGrand = row.key === 'grandTotal';
          const rowBg = isGrand ? colors.textPrimary : colors.secondaryBg;
          const textColor = isGrand ? colors.textWhite : colors.textPrimary;
          return (
            <View key={row.key} style={[styles.tableRow, { backgroundColor: rowBg }]}>
              <BodyCell width={220}>
                <Text style={[styles.bodyText, styles.mediumText, { color: textColor }]}>{row.label}</Text>
              </BodyCell>
              <BodyCell width={100} align="right">
                <Text style={[styles.bodyText, styles.mediumText, { color: textColor }]}>{formatCompact(item.bfy)}</Text>
              </BodyCell>
              <BodyCell width={100} align="right">
                <Text style={[styles.bodyText, styles.mediumText, { color: textColor }]}>{formatCompact(item.byd)}</Text>
              </BodyCell>
              <BodyCell width={100} align="right">
                <Text style={[styles.bodyText, styles.mediumText, { color: textColor }]}>{formatCompact(item.act)}</Text>
              </BodyCell>
              <BodyCell width={100} align="right">
                <Text style={[styles.bodyText, styles.mediumText, { color: textColor }]}>{item.var > 0 ? '+' : ''}{formatCompact(item.var)}</Text>
              </BodyCell>
              <BodyCell width={90}>
                {isGrand ? (
                  <Text style={[styles.bodyText, { color: colors.textWhite }]}>—</Text>
                ) : (
                  <ThinBar value={item.byd ? (item.act / item.byd) * 100 : 0} color={item.var > 0 ? colors.positiveGreen : colors.negativeRed} />
                )}
              </BodyCell>
            </View>
          );
        })}
      </TableCard>
    </View>
  );
}

function InventoryTab() {
  const groups = useMemo(
    () => [
      { label: '100% sold', rows: INVENTORY.projects.filter((project) => project.sp === 100) },
      { label: 'Watch 50-99%', rows: INVENTORY.projects.filter((project) => project.sp >= 50 && project.sp < 100) },
      { label: 'Critical <50%', rows: INVENTORY.projects.filter((project) => project.sp < 50) },
    ],
    [],
  );

  const soldAreaPct = INVENTORY.totals.saleableArea
    ? Math.round((INVENTORY.totals.soldArea / INVENTORY.totals.saleableArea) * 100)
    : 0;

  return (
    <View>
      <KPIGrid
        items={[
          { label: 'Projects', value: `${INVENTORY.totals.projects}` },
          { label: 'Topline', value: formatCompact(INVENTORY.totals.topline), sub: `${Math.round(INVENTORY.totals.saleableArea / 1000000)}M sft` },
          { label: 'Sales', value: formatCompact(INVENTORY.totals.sales), tone: colors.positiveGreen, sub: `${soldAreaPct}%` },
          { label: 'Unsold', value: formatCompact(INVENTORY.totals.unsoldValue), tone: colors.negativeRed, sub: `${formatArea(INVENTORY.totals.unsoldArea)} sft` },
        ]}
      />
      <AlertStrip tone="red" text="Skyparks 13% · Central Ph III 18% · Sanctuary Grove 3%" />

      <TableCard>
        <View style={styles.tableHeaderRow}>
          <HeaderCell label="#" width={42} />
          <HeaderCell label="Project" width={180} />
          <HeaderCell label="Community" width={120} />
          <HeaderCell label="Launch" width={86} />
          <HeaderCell label="Topline" width={100} align="right" />
          <HeaderCell label="Sold%" width={92} />
          <HeaderCell label="Unsold sft" width={100} align="right" />
          <HeaderCell label="Unsold AED" width={110} align="right" />
        </View>

        {groups.map((group) => (
          <View key={group.label}>
            <View style={styles.groupRow}>
              <Text style={styles.groupRowText}>{group.label}</Text>
            </View>
            {group.rows.map((project) => {
              const soldColor = getSoldColor(project.sp);
              const unsoldValueColor =
                project.uv === 0 ? colors.borderMd : project.uv > 1000000000 ? colors.negativeRed : project.uv > 200000000 ? colors.amberColor : colors.textSecondary;
              return (
                <View key={project.n} style={styles.tableRow}>
                  <BodyCell width={42}>
                    <Text style={styles.bodyText}>{project.n}</Text>
                  </BodyCell>
                  <BodyCell width={180}>
                    <Text style={styles.bodyText}>{project.nm}</Text>
                  </BodyCell>
                  <BodyCell width={120}>
                    <Text style={[styles.bodyText, styles.secondaryText]}>{project.cm}</Text>
                  </BodyCell>
                  <BodyCell width={86}>
                    <Text style={[styles.bodyText, styles.secondaryText]}>{project.dt}</Text>
                  </BodyCell>
                  <BodyCell width={100} align="right">
                    <Text style={styles.bodyText}>{formatCompact(project.tl)}</Text>
                  </BodyCell>
                  <BodyCell width={92}>
                    <View>
                      <Text style={[styles.bodyText, { color: soldColor }]}>{project.sp}%</Text>
                      <ThinBar value={project.sp} color={soldColor} />
                    </View>
                  </BodyCell>
                  <BodyCell width={100} align="right">
                    <Text style={[styles.bodyText, project.ua === 0 ? styles.borderText : null]}>{project.ua === 0 ? '—' : formatArea(project.ua)}</Text>
                  </BodyCell>
                  <BodyCell width={110} align="right">
                    <Text style={[styles.bodyText, { color: unsoldValueColor }]}>{project.uv === 0 ? '—' : formatCompact(project.uv)}</Text>
                  </BodyCell>
                </View>
              );
            })}
          </View>
        ))}

        <View style={[styles.tableRow, { backgroundColor: colors.textPrimary }]}>
          <BodyCell width={42}>
            <Text style={[styles.bodyText, styles.whiteText]}>46</Text>
          </BodyCell>
          <BodyCell width={180}>
            <Text style={[styles.bodyText, styles.whiteText, styles.mediumText]}>Grand total</Text>
          </BodyCell>
          <BodyCell width={120}>
            <Text style={[styles.bodyText, styles.whiteText]}>—</Text>
          </BodyCell>
          <BodyCell width={86}>
            <Text style={[styles.bodyText, styles.whiteText]}>—</Text>
          </BodyCell>
          <BodyCell width={100} align="right">
            <Text style={[styles.bodyText, styles.whiteText]}>{formatCompact(INVENTORY.totals.topline)}</Text>
          </BodyCell>
          <BodyCell width={92}>
            <Text style={[styles.bodyText, styles.whiteText]}>{soldAreaPct}%</Text>
          </BodyCell>
          <BodyCell width={100} align="right">
            <Text style={[styles.bodyText, styles.whiteText]}>{formatArea(INVENTORY.totals.unsoldArea)}</Text>
          </BodyCell>
          <BodyCell width={110} align="right">
            <Text style={[styles.bodyText, styles.whiteText]}>{formatCompact(INVENTORY.totals.unsoldValue)}</Text>
          </BodyCell>
        </View>
      </TableCard>
    </View>
  );
}

function OverdueTab() {
  const criticalShare = OVERDUE.totals.grand
    ? ((OVERDUE.totals.d4 + OVERDUE.totals.d5 + OVERDUE.totals.d6) / OVERDUE.totals.grand) * 100
    : 0;

  return (
    <View>
      <KPIGrid
        items={[
          { label: 'Total', value: formatCompact(OVERDUE.totals.grand), tone: colors.negativeRed },
          { label: '0-30', value: formatCompact(OVERDUE.totals.d0), tone: colors.positiveGreen },
          { label: '121-360', value: formatCompact(OVERDUE.totals.d4 + OVERDUE.totals.d5), tone: colors.negativeRed },
          { label: '>361', value: formatCompact(OVERDUE.totals.d6), tone: colors.darkRed || '#7f1d1d' },
        ]}
      />

      <View style={styles.card}>
        <View style={styles.ageingBar}>
          {BUCKET_META.map((bucket) => {
            const value = OVERDUE.totals[bucket.key];
            const flexValue = value || 1;
            return <View key={bucket.key} style={[styles.ageingSegment, { flex: flexValue, backgroundColor: bucket.color }]} />;
          })}
        </View>

        <View style={styles.ageingLabels}>
          {BUCKET_META.map((bucket) => (
            <View key={bucket.key} style={styles.ageingLabelItem}>
              <Text style={[styles.ageingLabelText, { color: bucket.color }]}>{bucket.label}</Text>
              <Text style={[styles.ageingLabelValue, { color: bucket.color }]}>{formatCompact(OVERDUE.totals[bucket.key])}</Text>
            </View>
          ))}
        </View>
      </View>

      <TableCard>
        <View style={styles.tableHeaderRow}>
          <HeaderCell label="Project" width={160} />
          {BUCKET_META.map((bucket) => (
            <HeaderCell key={bucket.key} label={bucket.label} width={86} align="right" color={bucket.color} />
          ))}
          <HeaderCell label="Total" width={96} align="right" />
          <HeaderCell label="Risk" width={110} />
        </View>

        {OVERDUE.projects.map((project) => {
          const rowBg = project.crit ? colors.redBg : colors.cardBg;
          const nameColor = project.crit ? colors.redText : project.d6 > 0 ? colors.amberText : colors.textPrimary;
          const riskRatio = project.tot ? ((project.d4 + project.d5 + project.d6) / project.tot) * 100 : 0;
          return (
            <View key={project.nm} style={[styles.tableRow, { backgroundColor: rowBg }]}>
              <BodyCell width={160}>
                <Text style={[styles.bodyText, { color: nameColor }]}>{project.nm}</Text>
              </BodyCell>
              {BUCKET_META.map((bucket) => (
                <BodyCell key={bucket.key} width={86} align="right">
                  <Text
                    style={[
                      styles.bodyText,
                      {
                        color: project[bucket.key] === 0 ? colors.borderMd : bucket.color,
                      },
                    ]}
                  >
                    {project[bucket.key] === 0 ? '—' : formatCompact(project[bucket.key])}
                  </Text>
                </BodyCell>
              ))}
              <BodyCell width={96} align="right">
                <Text style={styles.bodyText}>{formatCompact(project.tot)}</Text>
              </BodyCell>
              <BodyCell width={110}>
                <View>
                  <ThinBar value={riskRatio} color={riskRatio > 60 ? colors.negativeRed : riskRatio > 30 ? colors.amberColor : colors.positiveGreen} />
                  <Text style={[styles.riskText, { color: riskRatio > 60 ? colors.negativeRed : riskRatio > 30 ? colors.amberColor : colors.positiveGreen }]}>
                    {Math.round(riskRatio)}%
                  </Text>
                </View>
              </BodyCell>
            </View>
          );
        })}

        <View style={[styles.tableRow, { backgroundColor: colors.textPrimary }]}>
          <BodyCell width={160}>
            <Text style={[styles.bodyText, styles.whiteText, styles.mediumText]}>Grand total</Text>
          </BodyCell>
          {BUCKET_META.map((bucket) => (
            <BodyCell key={bucket.key} width={86} align="right">
              <Text style={[styles.bodyText, styles.whiteText]}>{formatCompact(OVERDUE.totals[bucket.key])}</Text>
            </BodyCell>
          ))}
          <BodyCell width={96} align="right">
            <Text style={[styles.bodyText, styles.whiteText]}>{formatCompact(OVERDUE.totals.grand)}</Text>
          </BodyCell>
          <BodyCell width={110}>
            <Text style={[styles.bodyText, styles.whiteText]}>{Math.round(criticalShare)}%</Text>
          </BodyCell>
        </View>
      </TableCard>
    </View>
  );
}

function HeaderCell({
  label,
  width,
  align = 'left',
  color,
}: {
  label: string;
  width: number;
  align?: 'left' | 'right';
  color?: string;
}) {
  return (
    <View style={[styles.headerCell, { width }]}>
      <Text style={[styles.headerCellText, { textAlign: align, color: color || colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

function BodyCell({
  children,
  width,
  align = 'left',
}: {
  children: React.ReactNode;
  width: number;
  align?: 'left' | 'right';
}) {
  return (
    <View style={[styles.bodyCell, { width, alignItems: align === 'right' ? 'flex-end' : 'flex-start' }]}>
      {children}
    </View>
  );
}

function ThinBar({ value, color }: { value: number; color: string }) {
  return (
    <View style={styles.thinBarTrack}>
      <View style={[styles.thinBarFill, { width: `${Math.max(0, Math.min(value, 100))}%`, backgroundColor: color }]} />
    </View>
  );
}

function getSoldColor(value: number) {
  if (value === 100) {
    return colors.positiveGreen;
  }

  if (value >= 95) {
    return colors.textPrimary;
  }

  if (value >= 50) {
    return colors.amberColor;
  }

  return colors.negativeRed;
}

function formatCompact(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return '—';
  }

  const absolute = Math.abs(value);
  let output = '';

  if (absolute >= 1000000000) {
    output = `${(absolute / 1000000000).toFixed(2)}B`;
  } else if (absolute >= 1000000) {
    output = `${(absolute / 1000000).toFixed(1)}M`;
  } else if (absolute >= 1000) {
    output = `${(absolute / 1000).toFixed(0)}K`;
  } else {
    output = `${absolute}`;
  }

  return value < 0 ? `-${output}` : output;
}

function formatArea(value: number) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }

  return `${value}`;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.pageBg,
  },
  content: {
    padding: 16,
    paddingBottom: 28,
  },
  headerWrap: {
    marginBottom: 14,
  },
  backLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  headerSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: 12,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: colors.textPrimary,
  },
  tabText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: colors.textPrimary,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
  },
  skeletonRow: {
    height: 48,
    backgroundColor: colors.borderMd,
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 12,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  kpiCard: {
    width: '48%',
    backgroundColor: colors.cardBg,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  kpiLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  kpiSub: {
    fontSize: 11,
    marginTop: 4,
    color: colors.textSecondary,
  },
  alertStrip: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
  },
  alertText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: colors.secondaryBg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  headerCell: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  headerCellText: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    fontWeight: '500',
  },
  groupRow: {
    backgroundColor: colors.tertiaryBg,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  groupRowText: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  bodyCell: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  bodyText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  mediumText: {
    fontWeight: '500',
  },
  secondaryText: {
    color: colors.textSecondary,
  },
  whiteText: {
    color: colors.textWhite,
  },
  borderText: {
    color: colors.borderMd,
  },
  varianceBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  varianceText: {
    fontSize: 10,
    fontWeight: '600',
  },
  thinBarTrack: {
    width: 72,
    height: 3,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  thinBarFill: {
    height: 3,
    borderRadius: 4,
  },
  ageingBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    margin: 12,
    marginBottom: 10,
  },
  ageingSegment: {
    height: 8,
  },
  ageingLabels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  ageingLabelItem: {
    width: '28%',
    marginBottom: 8,
  },
  ageingLabelText: {
    fontSize: 9,
    fontWeight: '500',
  },
  ageingLabelValue: {
    fontSize: 9,
    marginTop: 2,
  },
  riskText: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
});
