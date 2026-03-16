import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import type { MasterplanSummary } from '../../data/misData';

interface Props {
  summary: MasterplanSummary;
}

export function MISSummaryCards({ summary }: Props) {
  const cards = [
    { label: 'Total units', value: summary.units },
    { label: 'Projects', value: summary.projects },
    { label: 'Infrastructure', value: summary.infra },
    { label: 'Contract value', value: summary.contract },
    { label: 'Certified (Feb 2026)', value: summary.certified },
  ];

  return (
    <View style={styles.row}>
      {cards.map((c, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.label}>{c.label}</Text>
          <Text style={styles.value}>{c.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 6,
  },
  card: {
    flex: 1,
    backgroundColor: colors.secondaryBg,
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});
