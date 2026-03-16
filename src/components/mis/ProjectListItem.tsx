import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  name: string;
  units: number;
  pct: number;
  status: string;
  selected: boolean;
  onPress: () => void;
}

function getBarColor(pct: number): string {
  if (pct >= 70) return colors.positiveGreen;
  if (pct >= 35) return colors.amberColor;
  return colors.negativeRed;
}

export function ProjectListItem({ name, units, pct, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.item, selected && styles.itemSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.sub}>
        {units > 0 ? `${units.toLocaleString()} units` : 'Infrastructure'} · {pct}%
      </Text>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${Math.min(pct, 100)}%`, backgroundColor: getBarColor(pct) }]} />
      </View>
    </TouchableOpacity>
  );
}

export function GroupHeader({ label }: { label: string }) {
  return (
    <View style={styles.groupHeader}>
      <Text style={styles.groupLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.cardBg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
    padding: 8,
    paddingHorizontal: 12,
  },
  itemSelected: {
    backgroundColor: colors.secondaryBg,
    borderLeftWidth: 2,
    borderLeftColor: colors.textPrimary,
    paddingLeft: 10,
  },
  name: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  sub: {
    fontSize: 9.5,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  barBg: {
    height: 3,
    borderRadius: 99,
    backgroundColor: colors.border,
  },
  barFill: {
    height: 3,
    borderRadius: 99,
  },
  groupHeader: {
    backgroundColor: colors.tertiaryBg,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  groupLabel: {
    fontSize: 9,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: colors.textSecondary,
  },
});
