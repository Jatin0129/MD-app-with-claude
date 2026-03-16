import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, fontSize as fs, radius } from '../theme/colors';
import { AppHeader } from '../components/AppHeader';
import { MasterplanChip } from '../components/mis/MasterplanChip';
import { ProjectListItem, GroupHeader } from '../components/mis/ProjectListItem';
import { MISSummaryCards } from '../components/mis/MISSummaryCards';
import { AIInsightPanel } from '../components/mis/AIInsightPanel';
import { MISTable } from '../components/mis/MISTable';
import { builtInMISData } from '../data/misData';
import { uploadAndParseMIS, getLatestPDFInfo } from '../utils/misPdfParser';
import type { MISData, MISProject, Masterplan } from '../data/misData';
import type { UploadProgress } from '../utils/misPdfParser';

export default function MISScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const navigation = useNavigation<any>();

  const [data] = useState<MISData>(builtInMISData);
  const [selectedMasterplan, setSelectedMasterplan] = useState(0);
  const [selectedProject, setSelectedProject] = useState<MISProject | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadProgress | null>(null);
  const [hasPDF, setHasPDF] = useState(false);

  const masterplan = data.masterplans[selectedMasterplan];

  useEffect(() => {
    getLatestPDFInfo().then(info => {
      setHasPDF(!!info && !!info.path);
    });
  }, []);

  const handleUpload = useCallback(async () => {
    setUploading(true);
    await uploadAndParseMIS((p) => setUploadStatus(p));
    setUploading(false);
    getLatestPDFInfo().then(info => setHasPDF(!!info && !!info.path));
  }, []);

  const handleSelectMasterplan = useCallback((index: number) => {
    setSelectedMasterplan(index);
    setSelectedProject(null);
  }, []);

  const handleSelectProject = useCallback((project: MISProject) => {
    if (isTablet) {
      setSelectedProject(project);
    } else {
      navigation.navigate('MISDetail', { project });
    }
  }, [isTablet, navigation]);

  return (
    <SafeAreaView style={styles.wrapper} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with upload button */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <AppHeader title="MIS Center" />
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                if (hasPDF) {
                  navigation.navigate('MISPDFViewer');
                }
              }}
              activeOpacity={0.7}
            >
              <Ionicons
                name="document-text-outline"
                size={22}
                color={hasPDF ? colors.textSecondary : colors.borderMd}
              />
              <Text style={styles.iconLabel}>{hasPDF ? 'View PDF' : 'No file'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={handleUpload}
              activeOpacity={0.7}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator size="small" color={colors.textSecondary} />
              ) : (
                <Ionicons name="cloud-upload-outline" size={22} color={colors.textSecondary} />
              )}
              <Text style={styles.iconLabel}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upload status */}
        {uploadStatus && uploadStatus.stage !== 'done' && (
          <View style={styles.uploadBanner}>
            {uploadStatus.stage !== 'error' && (
              <ActivityIndicator size="small" color={colors.textSecondary} style={{ marginRight: 8 }} />
            )}
            <Text style={[
              styles.uploadText,
              uploadStatus.stage === 'error' && { color: colors.negativeRed },
            ]}>
              {uploadStatus.message}
            </Text>
          </View>
        )}

        {/* MIS source tag */}
        <View style={styles.misTag}>
          <View style={[styles.tagDot, { backgroundColor: hasPDF ? colors.positiveGreen : colors.amberColor }]} />
          <Text style={styles.tagText}>
            {hasPDF ? 'MIS uploaded \u00b7 parsed' : 'Using built-in data'}
          </Text>
        </View>

        {/* Masterplan chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsContent}
        >
          {data.masterplans.map((mp, i) => (
            <MasterplanChip
              key={mp.id}
              name={mp.name}
              sub={mp.sub}
              badgeType={mp.badgeType}
              selected={i === selectedMasterplan}
              onPress={() => handleSelectMasterplan(i)}
            />
          ))}
        </ScrollView>

        {/* Summary cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <MISSummaryCards summary={masterplan.summary} />
        </ScrollView>

        {/* Main content */}
        {isTablet ? (
          <View style={styles.splitView}>
            <ScrollView style={styles.leftPanel} showsVerticalScrollIndicator={false}>
              {renderProjectList(masterplan, selectedProject, handleSelectProject)}
            </ScrollView>
            <ScrollView style={styles.rightPanel} showsVerticalScrollIndicator={false}>
              {selectedProject ? (
                <MISTable project={selectedProject} />
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>Select a project from the list</Text>
                </View>
              )}
            </ScrollView>
          </View>
        ) : (
          renderProjectList(masterplan, selectedProject, handleSelectProject)
        )}

        {/* AI Insight Panel */}
        <View style={{ marginTop: 12 }}>
          <AIInsightPanel />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function renderProjectList(
  masterplan: Masterplan,
  selectedProject: MISProject | null,
  onSelect: (p: MISProject) => void
) {
  return (
    <View style={styles.projectList}>
      {masterplan.groups.map((group, gi) => (
        <View key={gi}>
          <GroupHeader label={group.label} />
          {group.projects.map((proj) => (
            <ProjectListItem
              key={proj.id}
              name={proj.name}
              units={proj.units}
              pct={proj.pct}
              status={proj.status}
              selected={selectedProject?.id === proj.id}
              onPress={() => onSelect(proj)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: colors.pageBg },
  scroll: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerLeft: { flex: 1 },
  headerButtons: { flexDirection: 'row', gap: 12, paddingTop: 4 },
  iconBtn: { alignItems: 'center' },
  iconLabel: { fontSize: 9, color: colors.textSecondary, marginTop: 2 },
  uploadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryBg,
    borderRadius: radius.sm,
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  uploadText: { fontSize: fs.sm, color: colors.textSecondary },
  misTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: 6,
  },
  tagDot: { width: 6, height: 6, borderRadius: 3 },
  tagText: { fontSize: 10, color: colors.textSecondary },
  chipsScroll: { marginBottom: spacing.md },
  chipsContent: { paddingRight: spacing.lg },
  splitView: { flexDirection: 'row', marginBottom: spacing.md },
  leftPanel: { width: 200, maxHeight: 500, borderRightWidth: 0.5, borderRightColor: colors.border },
  rightPanel: { flex: 1, paddingLeft: spacing.md },
  projectList: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  emptyState: { justifyContent: 'center', alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontSize: fs.md, color: colors.textSecondary },
});
