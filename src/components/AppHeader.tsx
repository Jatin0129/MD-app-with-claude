import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, fontSize } from '../theme/colors';

interface AppHeaderProps {
  title: string;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getFormattedDate(): string {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const weekday = now.toLocaleString('en-US', { weekday: 'long' });
  return `${day} ${month} \u00b7 ${weekday}`;
}

export function AppHeader({ title }: AppHeaderProps) {
  const navigation = useNavigation<any>();

  const handleAI = () => {
    // Navigate to AI screen — try stack first, then tab
    try {
      navigation.navigate('AI');
    } catch {
      // fallback
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{getFormattedDate()}</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7} onPress={handleAI}>
          <Ionicons name="sparkles-outline" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  left: {
    flex: 1,
  },
  greeting: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  right: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingTop: spacing.xs,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
});
