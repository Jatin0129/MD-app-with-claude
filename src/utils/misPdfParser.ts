import * as DocumentPicker from 'expo-document-picker';
import * as FileSystemLegacy from 'expo-file-system/legacy';
const FileSystem = FileSystemLegacy;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { analyzeDocument } from '../services/ai';
import type { MISData } from '../data/misData';

const MIS_DIR = FileSystem.documentDirectory + 'mis_reports/';

interface SavedPDFInfo {
  path: string;
  filename: string;
  reportDate: string;
  savedAt: string;
}

export async function savePDFLocally(fileUri: string, filename: string, reportDate: string): Promise<string> {
  const safeFilename = 'MIS_' + reportDate.replace(/\s/g, '_') + '.pdf';
  const destPath = MIS_DIR + safeFilename;

  await FileSystem.makeDirectoryAsync(MIS_DIR, { intermediates: true });
  await FileSystem.copyAsync({ from: fileUri, to: destPath });

  const info: SavedPDFInfo = {
    path: destPath,
    filename: safeFilename,
    reportDate,
    savedAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem('mis_pdf_' + reportDate, JSON.stringify(info));
  await AsyncStorage.setItem('mis_pdf_latest', JSON.stringify(info));

  return destPath;
}

export async function getLatestPDFInfo(): Promise<SavedPDFInfo | null> {
  try {
    const raw = await AsyncStorage.getItem('mis_pdf_latest');
    if (!raw) return null;
    const info: SavedPDFInfo = JSON.parse(raw);
    // Check if file still exists
    const fileInfo = await FileSystem.getInfoAsync(info.path);
    if (!fileInfo.exists) return { ...info, path: '' }; // file missing
    return info;
  } catch {
    return null;
  }
}

export async function checkPDFExists(path: string): Promise<boolean> {
  try {
    const info = await FileSystem.getInfoAsync(path);
    return info.exists;
  } catch {
    return false;
  }
}

export interface UploadProgress {
  stage: 'picking' | 'reading' | 'parsing' | 'saving' | 'done' | 'error';
  message: string;
}

export async function uploadAndParseMIS(
  onProgress: (p: UploadProgress) => void
): Promise<MISData | null> {
  try {
    onProgress({ stage: 'picking', message: 'Picking file...' });

    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf'],
      copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets?.length) {
      return null;
    }

    const file = result.assets[0];
    onProgress({ stage: 'reading', message: 'Reading PDF...' });

    // Read as base64
    const base64 = await FileSystem.readAsStringAsync(file.uri, {
      encoding: 'base64' as any,
    });

    // Save PDF locally
    onProgress({ stage: 'saving', message: 'Saving file...' });
    const reportDate = 'Feb 2026'; // Could be extracted from content
    await savePDFLocally(file.uri, file.name, reportDate);

    // Parse with AI
    onProgress({ stage: 'parsing', message: 'Parsing MIS PDF with AI...' });

    const systemPrompt = `You are a Sobha Realty MIS data extractor. Extract all project data from this Development MIS PDF and return it as a JSON object. Return ONLY valid JSON. No markdown. No explanation.`;

    const fileContent = `[PDF file: ${file.name}, size: ${file.size} bytes]\n\nBase64 content (first 3000 chars):\n${base64.substring(0, 3000)}`;

    const response = await analyzeDocument(fileContent, systemPrompt);

    try {
      const parsed = JSON.parse(response) as MISData;
      await AsyncStorage.setItem('mis_data', JSON.stringify(parsed));
      onProgress({ stage: 'done', message: `MIS updated from ${file.name}` });
      return parsed;
    } catch {
      // AI response wasn't valid JSON — store raw and use built-in data
      await AsyncStorage.setItem('mis_raw_response', response);
      onProgress({ stage: 'done', message: 'PDF saved. Using built-in data for display.' });
      return null;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Upload failed';
    onProgress({ stage: 'error', message: msg });
    return null;
  }
}
