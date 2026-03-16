import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type BadgeType = 'complete' | 'on-track' | 'watch' | 'risk' | 'upcoming' | 'infra' | 'subdeveloper';

const BADGE_COLORS: Record<BadgeType, { bg: string; text: string }> = {
  complete: { bg: colors.greenBg, text: colors.greenText },
  'on-track': { bg: colors.blueBg, text: colors.blueText },
  watch: { bg: colors.amberBg, text: colors.amberText },
  risk: { bg: colors.redBg, text: colors.redText },
  upcoming: { bg: colors.purpleBg, text: colors.purpleText },
  infra: { bg: colors.blueBg, text: colors.blueText },
  subdeveloper: { bg: colors.tertiaryBg, text: colors.textSecondary },
};

interface Props {
  name: string;
  sub: string;
  badgeType: BadgeType;
  selected: boolean;
  onPress: () => void;
}

export function MasterplanChip({ name, sub, badgeType, selected, onPress }: Props) {
  const badge = BADGE_COLORS[badgeType];
  const badgeLabel = badgeType === 'on-track' ? 'Active' :
    badgeType.charAt(0).toUpperCase() + badgeType.slice(1);

  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.sub} numberOfLines={1}>{sub}</Text>
      <View style={[styles.badge, { backgroundColor: badge.bg }]}>
        <Text style={[styles.badgeText, { color: badge.text }]}>{badgeLabel}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.cardBg,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 12,
    minWidth: 120,
    marginRight: 8,
  },
  chipSelected: {
    borderWidth: 1.5,
    borderColor: colors.textPrimary,
  },
  name: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  sub: {
    fontSize: 9,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 99,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '500',
  },
});
