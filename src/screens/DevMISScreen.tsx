import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper } from '../components/ui';
import { colors } from '../theme/colors';

export default function DevMISScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Monthly Development MIS</Text>
        <Text style={styles.sub}>Construction progress and cost tracking across all masterplans.</Text>
        <Text style={styles.hint}>Upload a development MIS PDF or XLSX to populate this view.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.pageBg },
  content: { padding: 14, paddingBottom: 40 },
  card: {
    backgroundColor: colors.cardBg,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 20,
  },
  title: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: 8 },
  sub: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
  hint: { fontSize: 11, color: colors.textMuted, marginTop: 12 },
});
