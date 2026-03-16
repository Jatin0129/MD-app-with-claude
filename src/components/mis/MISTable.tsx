import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import type { MISProject } from '../../data/misData';

interface Props {
  project: MISProject;
}

function getStatusColor(pct: number) {
  if (pct >= 70) return colors.positiveGreen;
  if (pct >= 35) return colors.amberColor;
  return colors.negativeRed;
}

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; text: string }> = {
    complete: { bg: colors.greenBg, text: colors.greenText },
    'on-track': { bg: colors.blueBg, text: colors.blueText },
    watch: { bg: colors.amberBg, text: colors.amberText },
    risk: { bg: colors.redBg, text: colors.redText },
    upcoming: { bg: colors.purpleBg, text: colors.purpleText },
    infra: { bg: colors.blueBg, text: colors.blueText },
    subdeveloper: { bg: colors.tertiaryBg, text: colors.textSecondary },
  };
  const c = cfg[status] || cfg['on-track'];
  const label = status === 'on-track' ? 'On Track' : status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.badgeText, { color: c.text }]}>{label}</Text>
    </View>
  );
}

function formatAED(val: string) {
  if (!val) return '-';
  const num = parseInt(val.replace(/,/g, ''));
  if (isNaN(num)) return val;
  if (num >= 1e9) return `AED ${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `AED ${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `AED ${(num / 1e3).toFixed(0)}K`;
  return `AED ${num.toLocaleString()}`;
}

export function MISTable({ project }: Props) {
  const totalContract = [project.d, project.s, project.c, project.a, project.cs]
    .map(v => parseInt((v || '0').replace(/,/g, '')))
    .reduce((a, b) => a + b, 0);

  return (
    <View style={styles.container}>
      {/* Detail Header */}
      <View style={styles.detailHeader}>
        <View style={styles.detailLeft}>
          <Text style={styles.detailName}>{project.name}</Text>
          {project.floors ? <Text style={styles.detailSub}>{project.floors} · Plot {project.plot}</Text> : null}
          {project.far ? <Text style={styles.detailSub}>FAR: {project.far} · SA/GFA: {project.saGfa} · SA/BUA: {project.saBua}</Text> : null}
          <View style={styles.badgeRow}>
            <StatusBadge status={project.status} />
            {project.rera ? (
              <View style={[styles.badge, { backgroundColor: project.rera === 'Overdue' ? colors.redBg : colors.blueBg }]}>
                <Text style={[styles.badgeText, { color: project.rera === 'Overdue' ? colors.redText : colors.blueText }]}>
                  RERA: {project.rera}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.detailRight}>
          <Text style={[styles.pctLarge, { color: getStatusColor(project.pct) }]}>
            {project.pct}%
          </Text>
          <View style={styles.progressBarLg}>
            <View style={[styles.progressFillLg, { width: `${Math.min(project.pct, 100)}%`, backgroundColor: getStatusColor(project.pct) }]} />
          </View>
        </View>
      </View>

      {/* Approvals strip */}
      {project.appr.length > 0 && (
        <View style={styles.approvalsStrip}>
          {project.appr.map((a, i) => (
            <View key={i} style={styles.approvalBadge}>
              <Text style={styles.approvalText}>{a}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Section labels */}
      <View style={styles.sectionLabels}>
        <View style={styles.sectionDot}>
          <View style={[styles.dot, { backgroundColor: colors.blueText }]} />
          <Text style={styles.sectionLabel}>Design & areas</Text>
        </View>
        <View style={styles.sectionDot}>
          <View style={[styles.dot, { backgroundColor: colors.positiveGreen }]} />
          <Text style={styles.sectionLabel}>Product mix</Text>
        </View>
        <View style={styles.sectionDot}>
          <View style={[styles.dot, { backgroundColor: colors.amberColor }]} />
          <Text style={styles.sectionLabel}>Contract & billed</Text>
        </View>
      </View>

      {/* Table with horizontal scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.tableScroll}>
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.colDesc]}>Description</Text>
            <Text style={[styles.headerCell, styles.colVal]}>Value</Text>
            <Text style={[styles.headerCell, styles.colMixType]}>Product type</Text>
            <Text style={[styles.headerCell, styles.colMixNos]}>Nos.</Text>
            <Text style={[styles.headerCell, styles.colCostItem]}>Cost item</Text>
            <Text style={[styles.headerCell, styles.colCostAmt]}>Contract (AED)</Text>
          </View>

          {/* Row 1: Units */}
          <View style={styles.dataRow}>
            <Text style={[styles.cell, styles.colDesc, styles.designCell]}>No. of units</Text>
            <Text style={[styles.cell, styles.colVal, styles.designCell]}>{project.units.toLocaleString()}</Text>
            <Text style={[styles.cell, styles.colMixType]}>{project.mix[0]?.type || '-'}</Text>
            <Text style={[styles.cell, styles.colMixNos]}>{project.mix[0]?.nos || '-'}</Text>
            <Text style={[styles.cell, styles.colCostItem, styles.costCell]}>Design</Text>
            <Text style={[styles.cell, styles.colCostAmt, styles.costCell]}>{formatAED(project.d)}</Text>
          </View>

          {/* Row 2: Floors */}
          <View style={styles.dataRow}>
            <Text style={[styles.cell, styles.colDesc, styles.designCell]}>No. of floors</Text>
            <Text style={[styles.cell, styles.colVal, styles.designCell]}>{project.floors || '-'}</Text>
            <Text style={[styles.cell, styles.colMixType]}>{project.mix[1]?.type || '-'}</Text>
            <Text style={[styles.cell, styles.colMixNos]}>{project.mix[1]?.nos || '-'}</Text>
            <Text style={[styles.cell, styles.colCostItem, styles.costCell]}>Supervision</Text>
            <Text style={[styles.cell, styles.colCostAmt, styles.costCell]}>{formatAED(project.s)}</Text>
          </View>

          {/* Row 3: GFA */}
          <View style={styles.dataRow}>
            <Text style={[styles.cell, styles.colDesc, styles.designCell]}>GFA (sft)</Text>
            <Text style={[styles.cell, styles.colVal, styles.designCell]}>{project.gfa || '-'}</Text>
            <Text style={[styles.cell, styles.colMixType]}>{project.mix[2]?.type || '-'}</Text>
            <Text style={[styles.cell, styles.colMixNos]}>{project.mix[2]?.nos || '-'}</Text>
            <Text style={[styles.cell, styles.colCostItem, styles.costCell]}>Construction</Text>
            <Text style={[styles.cell, styles.colCostAmt, styles.costCell]}>{formatAED(project.c)}</Text>
          </View>

          {/* Row 4: BUA */}
          <View style={styles.dataRow}>
            <Text style={[styles.cell, styles.colDesc, styles.designCell]}>BUA (sft)</Text>
            <Text style={[styles.cell, styles.colVal, styles.designCell]}>{project.bua || '-'}</Text>
            <Text style={[styles.cell, styles.colMixType]}>{project.mix[3]?.type || '-'}</Text>
            <Text style={[styles.cell, styles.colMixNos]}>{project.mix[3]?.nos || '-'}</Text>
            <Text style={[styles.cell, styles.colCostItem, styles.costCell]}>Authority</Text>
            <Text style={[styles.cell, styles.colCostAmt, styles.costCell]}>{formatAED(project.a)}</Text>
          </View>

          {/* Row 5: SA */}
          <View style={styles.dataRow}>
            <Text style={[styles.cell, styles.colDesc, styles.designCell]}>Saleable area (sft)</Text>
            <Text style={[styles.cell, styles.colVal, styles.designCell]}>{project.sa || '-'}</Text>
            <Text style={[styles.cell, styles.colMixType]}>{project.mix[4]?.type || '-'}</Text>
            <Text style={[styles.cell, styles.colMixNos]}>{project.mix[4]?.nos || '-'}</Text>
            <Text style={[styles.cell, styles.colCostItem, styles.costCell]}>Client supply</Text>
            <Text style={[styles.cell, styles.colCostAmt, styles.costCell]}>{formatAED(project.cs)}</Text>
          </View>

          {/* Extra mix rows */}
          {project.mix.slice(5).map((m, i) => (
            <View key={i} style={styles.dataRow}>
              <Text style={[styles.cell, styles.colDesc, styles.designCell]} />
              <Text style={[styles.cell, styles.colVal, styles.designCell]} />
              <Text style={[styles.cell, styles.colMixType]}>{m.type}</Text>
              <Text style={[styles.cell, styles.colMixNos]}>{m.nos}</Text>
              <Text style={[styles.cell, styles.colCostItem, styles.costCell]} />
              <Text style={[styles.cell, styles.colCostAmt, styles.costCell]} />
            </View>
          ))}

          {/* Total row */}
          <View style={styles.totalRow}>
            <Text style={[styles.cell, styles.colDesc, styles.totalText]}>Total</Text>
            <Text style={[styles.cell, styles.colVal, styles.totalText]}>{project.units.toLocaleString()} units</Text>
            <Text style={[styles.cell, styles.colMixType]} />
            <Text style={[styles.cell, styles.colMixNos]} />
            <Text style={[styles.cell, styles.colCostItem, styles.totalText]}>Total contract</Text>
            <Text style={[styles.cell, styles.colCostAmt, styles.totalText]}>{formatAED(totalContract.toString())}</Text>
          </View>

          {/* Billed row */}
          <View style={styles.totalRow}>
            <Text style={[styles.cell, styles.colDesc]} />
            <Text style={[styles.cell, styles.colVal]} />
            <Text style={[styles.cell, styles.colMixType]} />
            <Text style={[styles.cell, styles.colMixNos]} />
            <Text style={[styles.cell, styles.colCostItem, styles.totalText]}>Billed to date</Text>
            <Text style={[styles.cell, styles.colCostAmt, styles.totalText, { color: getStatusColor(project.pct) }]}>
              {formatAED(project.billed)} ({project.bp})
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Timeline row */}
      <View style={styles.timelineRow}>
        {project.start ? <Text style={styles.timelineItem}>Start: {project.start}</Text> : null}
        {project.end ? <Text style={styles.timelineItem}>Completion: {project.end}</Text> : null}
        {project.dur ? <Text style={styles.timelineItem}>Duration: {project.dur}</Text> : null}
      </View>

      {/* Remarks */}
      {project.rem ? (
        <View style={styles.remarksRow}>
          <Text style={styles.remarksLabel}>REMARKS</Text>
          <Text style={styles.remarksText}>{project.rem}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 12,
  },
  // Detail header
  detailHeader: {
    backgroundColor: colors.secondaryBg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    padding: 14,
  },
  detailLeft: { flex: 1 },
  detailName: { fontSize: 14, fontWeight: '500', color: colors.textPrimary, marginBottom: 4 },
  detailSub: { fontSize: 10, color: colors.textSecondary, marginBottom: 2 },
  badgeRow: { flexDirection: 'row', gap: 6, marginTop: 6 },
  badge: { borderRadius: 99, paddingVertical: 2, paddingHorizontal: 7 },
  badgeText: { fontSize: 9.5, fontWeight: '500' },
  detailRight: { alignItems: 'flex-end', justifyContent: 'center', minWidth: 60 },
  pctLarge: { fontSize: 24, fontWeight: '600', marginBottom: 4 },
  progressBarLg: { width: 60, height: 7, borderRadius: 99, backgroundColor: colors.border },
  progressFillLg: { height: 7, borderRadius: 99 },
  // Approvals
  approvalsStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 7,
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
    gap: 4,
  },
  approvalBadge: {
    backgroundColor: colors.greenBg,
    borderRadius: 99,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  approvalText: { fontSize: 9, fontWeight: '500', color: colors.greenText },
  // Section labels
  sectionLabels: {
    backgroundColor: colors.tertiaryBg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    padding: 7,
    paddingHorizontal: 14,
    gap: 16,
  },
  sectionDot: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  sectionLabel: { fontSize: 10, color: colors.textSecondary },
  // Table
  tableScroll: { marginBottom: 0 },
  table: {},
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.secondaryBg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  headerCell: {
    fontSize: 9,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    color: colors.textSecondary,
    padding: 6,
    paddingHorizontal: 8,
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  cell: {
    fontSize: 10,
    color: colors.textPrimary,
    padding: 5,
    paddingHorizontal: 8,
  },
  designCell: { backgroundColor: colors.designColBg },
  costCell: { backgroundColor: colors.costColBg },
  totalRow: {
    flexDirection: 'row',
    backgroundColor: colors.secondaryBg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  totalText: { fontWeight: '500' },
  // Column widths
  colDesc: { width: 120 },
  colVal: { width: 100 },
  colMixType: { width: 90 },
  colMixNos: { width: 50 },
  colCostItem: { width: 90 },
  colCostAmt: { width: 120 },
  // Timeline
  timelineRow: {
    backgroundColor: colors.tertiaryBg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    paddingHorizontal: 14,
    gap: 16,
  },
  timelineItem: { fontSize: 10, color: colors.textSecondary },
  // Remarks
  remarksRow: { padding: 10, paddingHorizontal: 14 },
  remarksLabel: {
    fontSize: 9,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  remarksText: { fontSize: 11, color: colors.textMuted, lineHeight: 16 },
});
