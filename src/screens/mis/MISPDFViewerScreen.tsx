import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as Sharing from 'expo-sharing';
import { colors, spacing, fontSize as fs, radius } from '../../theme/colors';
import { getLatestPDFInfo } from '../../utils/misPdfParser';

export default function MISPDFViewerScreen() {
  const navigation = useNavigation();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [filename, setFilename] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPDF();
  }, []);

  const loadPDF = async () => {
    try {
      const info = await getLatestPDFInfo();
      if (!info || !info.path) {
        setError('No PDF file found. Upload an MIS report first.');
        setLoading(false);
        return;
      }
      setPdfUri(info.path);
      setFilename(info.filename);
      setReportDate(info.reportDate);
      setLoading(false);
    } catch {
      setError('Failed to load PDF');
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!pdfUri) return;
    const available = await Sharing.isAvailableAsync();
    if (available) {
      await Sharing.shareAsync(pdfUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share MIS Report',
      });
    }
  };

  return (
    <SafeAreaView style={styles.wrapper} edges={['bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            MIS Report
          </Text>
          {reportDate ? (
            <Text style={styles.headerSub}>{reportDate}</Text>
          ) : null}
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleShare}
            activeOpacity={0.7}
            disabled={!pdfUri}
          >
            <Ionicons
              name="share-outline"
              size={20}
              color={pdfUri ? colors.textSecondary : colors.borderMd}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={colors.textSecondary} />
          <Text style={styles.stateText}>Loading PDF...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerState}>
          <Ionicons name="document-outline" size={48} color={colors.borderMd} />
          <Text style={styles.stateText}>{error}</Text>
          <TouchableOpacity
            style={styles.goBackBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.goBackText}>Go back</Text>
          </TouchableOpacity>
        </View>
      ) : pdfUri ? (
        <View style={styles.pdfContainer}>
          {Platform.OS === 'android' ? (
            <WebView
              source={{ uri: `file://${pdfUri.replace('file://', '')}` }}
              style={styles.webview}
              originWhitelist={['*']}
              allowFileAccess
              allowFileAccessFromFileURLs
              allowUniversalAccessFromFileURLs
              startInLoadingState
              renderLoading={() => (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color={colors.textSecondary} />
                </View>
              )}
            />
          ) : (
            <WebView
              source={{ uri: pdfUri }}
              style={styles.webview}
              startInLoadingState
              renderLoading={() => (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color={colors.textSecondary} />
                </View>
              )}
            />
          )}
          {/* Filename bar */}
          <View style={styles.filenameBar}>
            <Ionicons name="document-text" size={14} color={colors.textSecondary} />
            <Text style={styles.filenameText} numberOfLines={1}>
              {filename}
            </Text>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: colors.pageBg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
    backgroundColor: colors.cardBg,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: { flex: 1, marginLeft: 4 },
  headerTitle: {
    fontSize: fs.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  headerSub: {
    fontSize: fs.xs,
    color: colors.textSecondary,
    marginTop: 1,
  },
  headerActions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  stateText: {
    fontSize: fs.md,
    color: colors.textSecondary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  goBackBtn: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.secondaryBg,
  },
  goBackText: {
    fontSize: fs.sm,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  pdfContainer: { flex: 1 },
  webview: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pageBg,
  },
  filenameBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    backgroundColor: colors.secondaryBg,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  filenameText: {
    fontSize: fs.xs,
    color: colors.textSecondary,
    flex: 1,
  },
});
