import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, spacing, radius } from '../theme/colors';

/**
 * Formats raw AI text into styled React Native components.
 * - Bold numbers and percentages
 * - Proper bullet point rendering
 * - Highlighted "Recommendation:" / "Watch point:" lines
 */

interface FormattedSection {
  type: 'paragraph' | 'bullet' | 'recommendation';
  text: string;
}

function parseSections(text: string): FormattedSection[] {
  const lines = text.split('\n').filter((l) => l.trim().length > 0);
  const sections: FormattedSection[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect recommendation/watch point lines
    if (/^(recommendation|watch point|action|key takeaway):/i.test(trimmed)) {
      sections.push({ type: 'recommendation', text: trimmed });
    }
    // Detect bullet points
    else if (/^[-•*]\s/.test(trimmed)) {
      sections.push({ type: 'bullet', text: trimmed.replace(/^[-•*]\s*/, '') });
    }
    // Detect numbered list items
    else if (/^\d+[.)]\s/.test(trimmed)) {
      sections.push({ type: 'bullet', text: trimmed });
    }
    // Regular paragraph
    else {
      sections.push({ type: 'paragraph', text: trimmed });
    }
  }

  return sections;
}

/**
 * Renders inline text with bold numbers/percentages.
 */
function renderInlineText(text: string): React.ReactNode[] {
  // Match numbers with optional currency, percentage, decimal, comma formatting
  const parts = text.split(/(\$?AED?\s?\d[\d,.]*%?|\d[\d,.]+%)/g);

  return parts.map((part, i) => {
    if (/^\$?AED?\s?\d|^\d[\d,.]+%?$/.test(part)) {
      return (
        <Text key={i} style={styles.boldNumber}>
          {part}
        </Text>
      );
    }
    return <Text key={i}>{part}</Text>;
  });
}

/**
 * Main component: takes raw AI text and returns formatted view.
 */
export function FormatAIResponse({ text }: { text: string }) {
  const sections = parseSections(text);

  return (
    <View>
      {sections.map((section, i) => {
        switch (section.type) {
          case 'recommendation':
            return (
              <View key={i} style={styles.recommendationBox}>
                <Text style={styles.recommendationText}>
                  {renderInlineText(section.text)}
                </Text>
              </View>
            );
          case 'bullet':
            return (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>
                  {renderInlineText(section.text)}
                </Text>
              </View>
            );
          case 'paragraph':
          default:
            return (
              <Text key={i} style={styles.paragraph}>
                {renderInlineText(section.text)}
              </Text>
            );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: fontSize.base,
    color: colors.textMuted,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  boldNumber: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
    paddingLeft: spacing.sm,
  },
  bulletDot: {
    fontSize: fontSize.base,
    color: colors.textMuted,
    marginRight: spacing.sm,
    lineHeight: 22,
  },
  bulletText: {
    fontSize: fontSize.base,
    color: colors.textMuted,
    lineHeight: 22,
    flex: 1,
  },
  recommendationBox: {
    backgroundColor: colors.pageBg,
    borderLeftWidth: 3,
    borderLeftColor: colors.textPrimary,
    borderRadius: radius.sm,
    padding: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  recommendationText: {
    fontSize: fontSize.base,
    color: colors.textPrimary,
    fontWeight: '600',
    lineHeight: 22,
  },
});
