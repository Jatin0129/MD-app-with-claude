import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { MIS_CARDS, MISCardConfig } from '../config/misIndex';
import Svg, { Rect, Circle } from 'react-native-svg';

function CardIcon({ card }: { card: MISCardConfig }) {
  return (
    <View style={[styles.iconBlock, { backgroundColor: card.iconBg }]}>
      <Svg width={14} height={14} viewBox="0 0 14 14">
        {card.iconShape === 'square' && (
          <Rect x={0} y={0} width={14} height={14} rx={3} fill={card.iconColor} />
        )}
        {card.iconShape === 'circle' && (
          <Circle cx={7} cy={7} r={7} fill={card.iconColor} />
        )}
        {card.iconShape === 'rect' && (
          <Rect x={0} y={2} width={14} height={10} rx={2} fill={card.iconColor} />
        )}
        {card.iconShape === 'tallRect' && (
          <Rect x={1} y={0} width={12} height={14} rx={3} fill={card.iconColor} />
        )}
      </Svg>
    </View>
  );
}

export default function SobhaScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Sobha Realty</Text>
            <Text style={styles.headerSub}>MIS Dashboard</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
              <Ionicons name="cloud-upload-outline" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
              <Ionicons name="sparkles-outline" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* MIS Cards from config */}
        <View style={styles.cardList}>
          {MIS_CARDS.map((card) => (
            <TouchableOpacity
              key={card.key}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(card.screen)}
            >
              <CardIcon card={card} />
              <View style={styles.cardCenter}>
                <Text style={styles.cardName}>{card.name}</Text>
                <Text style={styles.cardSub}>{card.subtitle}</Text>
              </View>
              <View style={styles.cardRight}>
                <View style={[styles.badge, { backgroundColor: card.badgeBg }]}>
                  <Text style={[styles.badgeText, { color: card.badgeText }]}>
                    {card.freq}
                  </Text>
                </View>
                <Text style={styles.chevron}>{'\u203A'}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Last synced */}
        <View style={styles.syncRow}>
          <View style={styles.syncDot} />
          <Text style={styles.syncText}>Last synced: 10 Mar 2026 \u00b7 09:41 AM</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cardBg },
  scroll: { flex: 1 },
  content: { padding: 14, paddingBottom: 40 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  headerTitle: { fontSize: 17, fontWeight: '500', color: colors.textPrimary },
  headerSub: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  headerIcons: { flexDirection: 'row', gap: 8 },
  headerIconBtn: {
    width: 28,
    height: 28,
    backgroundColor: colors.tertiaryBg,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardList: { gap: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 13,
    paddingHorizontal: 14,
  },
  iconBlock: {
    width: 32,
    height: 32,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCenter: { flex: 1, marginLeft: 11 },
  cardName: { fontSize: 12.5, fontWeight: '500', color: colors.textPrimary },
  cardSub: { fontSize: 10, color: colors.textSecondary, marginTop: 2 },
  cardRight: { alignItems: 'flex-end', gap: 5 },
  badge: { borderRadius: 99, paddingHorizontal: 7, paddingVertical: 2 },
  badgeText: { fontSize: 8.5, fontWeight: '500' },
  chevron: { fontSize: 16, color: colors.borderMd },

  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 6,
  },
  syncDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.positiveGreen },
  syncText: { fontSize: 9.5, color: colors.textSecondary },
});
