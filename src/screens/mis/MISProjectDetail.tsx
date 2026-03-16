import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme/colors';
import { MISTable } from '../../components/mis/MISTable';
import { AppHeader } from '../../components/AppHeader';
import type { MISProject } from '../../data/misData';

interface Props {
  route: { params: { project: MISProject } };
}

export default function MISProjectDetail({ route }: Props) {
  const { project } = route.params;

  return (
    <SafeAreaView style={styles.wrapper} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader title={project.name.length > 25 ? project.name.substring(0, 25) + '...' : project.name} />
        <MISTable project={project} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: colors.pageBg },
  scroll: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
});
