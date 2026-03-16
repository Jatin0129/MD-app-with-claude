import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CHIPS = [
  'Which projects breach RERA deadline?',
  'Summarise Hartland II cost certified vs contract',
  'What is the construction progress of Sobha Sanctuary?',
];

export function AIInsightPanel() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.panel}>
      <Text style={styles.label}>AI DEVELOPMENT INSIGHT · FEB 2026</Text>
      <Text style={styles.text}>
        Sobha Hartland completion momentum strong with Crest Grande at 94.7%. Creek Vista Heights
        and Waves Opulence on watch — both approaching RERA deadlines. Hartland II Riverside Crescent
        cluster progressing uniformly at 27-39%. Seahaven RERA overdue requires immediate escalation.
        Sobha Central and Sanctuary in early stages — monitor enabling works timeline.
      </Text>
      <View style={styles.chips}>
        {CHIPS.map((chip, i) => (
          <TouchableOpacity
            key={i}
            style={styles.chip}
            activeOpacity={0.7}
            onPress={() => {
              try { navigation.navigate('AI', { prefill: chip }); } catch {}
            }}
          >
            <Text style={styles.chipText}>{chip} {'\u2197'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#18181b',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#71717a',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    color: '#d4d4d8',
    lineHeight: 20,
    marginBottom: 12,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 99,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  chipText: {
    fontSize: 11,
    color: '#a1a1aa',
  },
});
