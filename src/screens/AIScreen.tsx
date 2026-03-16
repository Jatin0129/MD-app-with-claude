import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import {
  ScreenWrapper,
  SectionCard,
  AIChip,
  PrimaryButton,
  AlertBox,
  InfoBox,
} from '../components/ui';
import { colors, radius, spacing, fontSize } from '../theme/colors';
import { askSobhaAI, generateFollowUps } from '../services/ai';
import { FormatAIResponse } from '../utils/formatAIResponse';
import { Ionicons } from '@expo/vector-icons';

const SUGGESTED_PROMPTS = [
  'How are Skyvue sales this week?',
  'Compare collections to target this month',
  'What should I watch in UAE real estate right now?',
  'Summarise the latest MIS report',
  'What is Aldar doing that we should be aware of?',
];

export default function AIScreen() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSend = async () => {
    if (!query.trim() || loading) return;
    setLoading(true);
    setError(null);
    setFollowUps([]);
    setCopied(false);

    try {
      const res = await askSobhaAI(query);
      setResponse(res);
      setFollowUps(generateFollowUps(res, query));
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unable to process your query.';
      if (msg.includes('limit reached')) {
        setError(msg);
      } else {
        setError('AI service unavailable. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChip = (text: string) => {
    setQuery(text);
  };

  const handleCopy = async () => {
    if (response) {
      await Clipboard.setStringAsync(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResponse('');
    setFollowUps([]);
    setError(null);
    setCopied(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenWrapper title="Ask Sobha AI">

        {/* Rate limit error */}
        {error && <AlertBox type="amber" text={error} />}

        <SectionCard heading="Ask Sobha AI">
          {/* Suggested prompts */}
          <View style={styles.chipsRow}>
            {SUGGESTED_PROMPTS.map((prompt) => (
              <AIChip key={prompt} text={prompt} onPress={() => handleChip(prompt)} />
            ))}
          </View>

          {/* Query input */}
          <TextInput
            style={styles.input}
            placeholder="Ask anything about Sobha..."
            placeholderTextColor={colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            multiline
            editable={!loading}
          />

          {/* Action buttons */}
          <View style={styles.buttonRow}>
            {(response || query) && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClear}
                activeOpacity={0.7}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            )}
            <PrimaryButton
              label={loading ? 'Thinking...' : 'Send query'}
              onPress={handleSend}
            />
          </View>
        </SectionCard>

        {/* Loading state */}
        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={colors.textSecondary} />
            <Text style={styles.loadingText}>Thinking...</Text>
          </View>
        )}

        {/* Response */}
        {response && !loading ? (
          <SectionCard heading="Response">
            <FormatAIResponse text={response} />

            {/* Copy button */}
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopy}
              activeOpacity={0.7}
            >
              <Ionicons
                name={copied ? 'checkmark-circle' : 'copy-outline'}
                size={16}
                color={copied ? colors.positiveGreen : colors.textSecondary}
              />
              <Text
                style={[
                  styles.copyText,
                  copied && { color: colors.positiveGreen },
                ]}
              >
                {copied ? 'Copied' : 'Copy'}
              </Text>
            </TouchableOpacity>

            {/* Follow-up chips */}
            {followUps.length > 0 && (
              <View style={styles.followUpSection}>
                <Text style={styles.followUpLabel}>FOLLOW UP</Text>
                <View style={styles.chipsRow}>
                  {followUps.map((fu) => (
                    <AIChip key={fu} text={fu} onPress={() => handleChip(fu)} />
                  ))}
                </View>
              </View>
            )}
          </SectionCard>
        ) : !loading && !response ? (
          <SectionCard heading="Response">
            <InfoBox text="Ask a question to get AI-powered insights about Sobha's business, market conditions, and performance." />
          </SectionCard>
        ) : null}
      </ScreenWrapper>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    backgroundColor: colors.cardBg,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.md,
  },
  clearButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  clearButtonText: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  loadingText: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: spacing.sm,
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  copyText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  followUpSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.pageBg,
  },
  followUpLabel: {
    fontSize: fontSize.xxs,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },
});
