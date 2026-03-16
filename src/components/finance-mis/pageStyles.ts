import { StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../../theme/colors';

export const financePageStyles = StyleSheet.create({
  labelCell: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  indentedLabel: {
    paddingLeft: spacing.md,
  },
  emphasisLabel: {
    fontWeight: '700',
  },
  emphasisCell: {
    fontWeight: '700',
  },
  grandLabel: {
    color: colors.textWhite,
    fontWeight: '700',
  },
  numericCell: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  mutedNumericCell: {
    color: colors.textMuted,
  },
  mutedCell: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  grandCellText: {
    color: colors.textWhite,
  },
  grandPctText: {
    color: 'rgba(255,255,255,0.85)',
  },
  progressCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  positiveText: {
    color: colors.positiveGreen,
  },
  warningText: {
    color: colors.amberColor,
  },
  negativeText: {
    color: colors.negativeRed,
  },
  agedBucketText: {
    color: colors.negativeRed,
  },
  deepAgedBucketText: {
    color: colors.redText,
  },
});
