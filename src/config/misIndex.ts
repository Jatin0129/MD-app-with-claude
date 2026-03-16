import { colors } from '../theme/colors';

export interface MISCardConfig {
  key: string;
  name: string;
  subtitle: string;
  freq: 'Daily' | 'Monthly';
  iconBg: string;
  iconColor: string;
  iconShape: 'square' | 'circle' | 'rect' | 'tallRect';
  badgeBg: string;
  badgeText: string;
  screen: string;
}

export const MIS_CARDS: MISCardConfig[] = [
  {
    key: 'dailySales',
    name: 'Daily Sales MIS',
    subtitle: 'Updated daily \u00b7 Launches, bookings, VSF',
    freq: 'Daily',
    iconBg: colors.blueBg,
    iconColor: colors.blueIcon,
    iconShape: 'square',
    badgeBg: colors.blueBg,
    badgeText: colors.blueText,
    screen: 'DailySalesMIS',
  },
  {
    key: 'dailyCollections',
    name: 'Daily Collections MIS',
    subtitle: 'Updated daily \u00b7 Escrow, overdue, receipts',
    freq: 'Daily',
    iconBg: colors.greenBg,
    iconColor: colors.positiveGreen,
    iconShape: 'circle',
    badgeBg: colors.greenBg,
    badgeText: colors.greenText,
    screen: 'DailyCollectionsMIS',
  },
  {
    key: 'monthly-finance',
    name: 'Monthly Finance MIS',
    subtitle: 'Feb 2026 \u00b7 Income, overheads, inventory',
    freq: 'Monthly',
    iconBg: colors.amberBg,
    iconColor: colors.amberColor,
    iconShape: 'rect',
    badgeBg: colors.amberBg,
    badgeText: colors.amberText,
    screen: 'FinanceMIS',
  },
  {
    key: 'monthly-development',
    name: 'Monthly Development MIS',
    subtitle: 'Feb 2026 \u00b7 Construction progress, costs',
    freq: 'Monthly',
    iconBg: colors.purpleBg,
    iconColor: colors.purpleIcon,
    iconShape: 'tallRect',
    badgeBg: colors.purpleBg,
    badgeText: colors.purpleText,
    screen: 'MIS',
  },
];
