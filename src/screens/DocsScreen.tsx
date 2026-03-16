import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {
  ScreenWrapper,
  SectionCard,
  AlertBox,
} from '../components/ui';
import { colors, radius, spacing, fontSize } from '../theme/colors';
import { getDocuments, searchDocuments } from '../services/documents';
import type { DocumentItem } from '../data/mock';

export default function DocsScreen() {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDocuments();
      setDocs(data);
    } catch {
      setError('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!loading) {
      searchDocuments(searchQuery).then(setDocs);
    }
  }, [searchQuery]);

  const handleSummarize = (name: string) => {
    // TODO: Connect to AI summarization service
    Alert.alert('AI Summarize', `Summarization for "${name}" will be available when the AI service is connected.`);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.textSecondary} />
      </View>
    );
  }

  if (error) {
    return (
      <ScreenWrapper>
        <AlertBox type="amber" text={error} />
      </ScreenWrapper>
    );
  }

  const categories = ['Board presentations', 'MIS reports', 'Strategy notes', 'Project reports'];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenWrapper title="Documents">

        <TextInput
          style={styles.searchInput}
          placeholder="Search documents..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {categories.map((cat) => {
          const catDocs = docs.filter((d) => d.category === cat);
          if (catDocs.length === 0) return null;
          return (
            <SectionCard key={cat} heading={cat}>
              {catDocs.map((doc, i) => (
                <View key={i} style={styles.docRow}>
                  <View style={styles.docInfo}>
                    <Text style={styles.docName}>{doc.name}</Text>
                    <Text style={styles.docDate}>{doc.date}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.summarizeBtn}
                    onPress={() => handleSummarize(doc.name)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.summarizeBtnText}>AI Summarize</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </SectionCard>
          );
        })}
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pageBg,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    backgroundColor: colors.cardBg,
    marginBottom: spacing.lg,
  },
  docRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.pageBg,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: fontSize.base,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  docDate: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  summarizeBtn: {
    backgroundColor: colors.pageBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  summarizeBtnText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textMuted,
  },
});
