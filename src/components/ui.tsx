import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing, fontSize } from '../theme/colors';
import { AppHeader } from './AppHeader';

// ─── 1. MetricCard ───────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  style?: ViewStyle;
}

export function MetricCard({ label, value, change, style }: MetricCardProps) {
  const isPositive = change ? !change.startsWith('-') : undefined;

  return (
    <View style={[styles.metricCard, style]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      {change !== undefined && (
        <Text
          style={[
            styles.metricChange,
            { color: isPositive ? colors.positiveGreen : colors.negativeRed },
          ]}
        >
          {change}
        </Text>
      )}
    </View>
  );
}

// ─── 2. MetricGrid ──────────────────────────────────────────────────────────

interface MetricGridProps {
  items: { label: string; value: string; change?: string }[];
}

export function MetricGrid({ items }: MetricGridProps) {
  return (
    <View style={styles.metricGrid}>
      {items.map((item, i) => (
        <MetricCard
          key={i}
          label={item.label}
          value={item.value}
          change={item.change}
          style={styles.metricGridItem}
        />
      ))}
    </View>
  );
}

// ─── 3. SectionCard ─────────────────────────────────────────────────────────

interface SectionCardProps {
  heading: string;
  children: React.ReactNode;
}

export function SectionCard({ heading, children }: SectionCardProps) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {children}
    </View>
  );
}

// ─── 4. ListRow ─────────────────────────────────────────────────────────────

interface ListRowProps {
  left: string;
  right: string;
  rightColor?: string;
}

export function ListRow({ left, right, rightColor }: ListRowProps) {
  return (
    <View style={styles.listRow}>
      <Text style={styles.listRowLeft}>{left}</Text>
      <Text style={[styles.listRowRight, rightColor ? { color: rightColor } : undefined]}>
        {right}
      </Text>
    </View>
  );
}

// ─── 5. TabBarRow ───────────────────────────────────────────────────────────

interface TabBarRowProps {
  tabs: string[];
  active: string;
  onSelect: (tab: string) => void;
}

export function TabBarRow({ tabs, active, onSelect }: TabBarRowProps) {
  return (
    <View style={styles.tabBarRow}>
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tabPill, isActive && styles.tabPillActive]}
            onPress={() => onSelect(tab)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabPillText, isActive && styles.tabPillTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── 6. AlertBox ────────────────────────────────────────────────────────────

interface AlertBoxProps {
  type: 'amber' | 'red' | 'green';
  text: string;
}

const alertColors = {
  amber: { bg: colors.amberBg, text: colors.amberText },
  red: { bg: colors.redBg, text: colors.redText },
  green: { bg: colors.greenBg, text: colors.greenText },
};

export function AlertBox({ type, text }: AlertBoxProps) {
  const c = alertColors[type];
  return (
    <View style={[styles.alertBox, { backgroundColor: c.bg }]}>
      <Text style={[styles.alertText, { color: c.text }]}>{text}</Text>
    </View>
  );
}

// ─── 7. InfoBox ─────────────────────────────────────────────────────────────

interface InfoBoxProps {
  text: string;
}

export function InfoBox({ text }: InfoBoxProps) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoBoxText}>{text}</Text>
    </View>
  );
}

// ─── 8. AIInsightCard ───────────────────────────────────────────────────────

interface AIInsightCardProps {
  text: string;
  label?: string;
}

export function AIInsightCard({ text, label = 'AI Insight' }: AIInsightCardProps) {
  return (
    <View style={styles.aiInsightCard}>
      <Text style={styles.aiInsightLabel}>{label}</Text>
      <Text style={styles.aiInsightText}>{text}</Text>
    </View>
  );
}

// ─── 9. UploadButton ────────────────────────────────────────────────────────

interface UploadButtonProps {
  label: string;
  onPress: () => void;
}

export function UploadButton({ label, onPress }: UploadButtonProps) {
  return (
    <TouchableOpacity style={styles.uploadButton} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name="cloud-upload-outline" size={20} color={colors.textMuted} />
      <Text style={styles.uploadButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── 10. PrimaryButton ──────────────────────────────────────────────────────

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
}

export function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={styles.primaryButton} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── 11. AIChip ─────────────────────────────────────────────────────────────

interface AIChipProps {
  text: string;
  onPress?: () => void;
}

export function AIChip({ text, onPress }: AIChipProps) {
  return (
    <TouchableOpacity style={styles.aiChip} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.aiChipText}>{text}</Text>
    </TouchableOpacity>
  );
}

// ─── 12. MoreMenuItem ───────────────────────────────────────────────────────

interface MoreMenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle?: string;
  onPress: () => void;
}

export function MoreMenuItem({ icon, label, subtitle, onPress }: MoreMenuItemProps) {
  return (
    <TouchableOpacity style={styles.moreMenuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.moreMenuIcon}>
        <Ionicons name={icon} size={22} color={colors.textMuted} />
      </View>
      <View style={styles.moreMenuContent}>
        <Text style={styles.moreMenuLabel}>{label}</Text>
        {subtitle && <Text style={styles.moreMenuSubtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.borderMd} />
    </TouchableOpacity>
  );
}

// ─── 13. ScreenWrapper ──────────────────────────────────────────────────────

interface ScreenWrapperProps {
  children: React.ReactNode;
  title?: string;
}

export function ScreenWrapper({ children, title }: ScreenWrapperProps) {
  return (
    <SafeAreaView style={styles.screenWrapper} edges={['bottom']}>
      <ScrollView
        style={styles.screenScroll}
        contentContainerStyle={styles.screenScrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {title && <AppHeader title={title} />}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── 14. PageTitle ──────────────────────────────────────────────────────────

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <View style={styles.pageTitle}>
      <Text style={styles.pageTitleText}>{title}</Text>
      {subtitle && <Text style={styles.pageTitleSubtitle}>{subtitle}</Text>}
    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // MetricCard
  metricCard: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  metricLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  metricValue: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  metricChange: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginTop: spacing.xs,
  },

  // MetricGrid
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
    marginBottom: spacing.lg,
  },
  metricGridItem: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: spacing.sm,
  },

  // SectionCard
  sectionCard: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.md,
  },

  // ListRow
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.pageBg,
  },
  listRowLeft: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    flex: 1,
  },
  listRowRight: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'right',
  },

  // TabBarRow
  tabBarRow: {
    flexDirection: 'row',
    backgroundColor: colors.pageBg,
    borderRadius: radius.pill,
    padding: spacing.xs,
    marginBottom: spacing.lg,
  },
  tabPill: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  tabPillActive: {
    backgroundColor: colors.textPrimary,
  },
  tabPillText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textMuted,
  },
  tabPillTextActive: {
    color: colors.textWhite,
  },

  // AlertBox
  alertBox: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  alertText: {
    fontSize: fontSize.md,
    fontWeight: '500',
    lineHeight: 18,
  },

  // InfoBox
  infoBox: {
    backgroundColor: colors.pageBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  infoBoxText: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    lineHeight: 18,
  },

  // AIInsightCard
  aiInsightCard: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.textPrimary,
    elevation: 1,
  },
  aiInsightLabel: {
    fontSize: fontSize.xxs,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },
  aiInsightText: {
    fontSize: fontSize.base,
    color: colors.textMuted,
    lineHeight: 20,
  },

  // UploadButton
  uploadButton: {
    borderWidth: 1,
    borderColor: colors.borderMd,
    borderStyle: 'dashed',
    borderRadius: radius.md,
    backgroundColor: colors.cardBg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  uploadButtonText: {
    fontSize: fontSize.base,
    color: colors.textMuted,
    fontWeight: '500',
  },

  // PrimaryButton
  primaryButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.textWhite,
  },

  // AIChip
  aiChip: {
    backgroundColor: colors.pageBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  aiChipText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },

  // MoreMenuItem
  moreMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  moreMenuIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.pageBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  moreMenuContent: {
    flex: 1,
  },
  moreMenuLabel: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  moreMenuSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // ScreenWrapper
  screenWrapper: {
    flex: 1,
    backgroundColor: colors.pageBg,
  },
  screenScroll: {
    flex: 1,
  },
  screenScrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },

  // PageTitle
  pageTitle: {
    marginBottom: spacing.lg,
  },
  pageTitleText: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  pageTitleSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
