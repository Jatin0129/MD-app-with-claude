import { AI_UNAVAILABLE_MESSAGE } from '../config/ai';
import {
  checkAIRateLimit,
  checkDocRateLimit,
  recordAIQuery,
  recordDocQuery,
} from './aiRateLimit';
import { chatWithGroq } from './ai/groqChat';

export type AIQueryMode = 'general' | 'document' | 'insight' | 'comparison';

interface AIQueryOptions {
  mode: AIQueryMode;
  query: string;
  contextData?: Record<string, unknown>;
  documentText?: string;
}

export async function queryAI(options: AIQueryOptions): Promise<string> {
  const { mode, query, contextData, documentText } = options;

  if (mode === 'document') {
    const docLimit = await checkDocRateLimit();
    if (!docLimit.allowed) {
      throw new Error(`Document analysis limit reached. Resets in ${docLimit.minutesRemaining} minutes.`);
    }
  } else {
    const limit = await checkAIRateLimit();
    if (!limit.allowed) {
      throw new Error(`AI query limit reached. Resets in ${limit.minutesRemaining} minutes.`);
    }
  }

  const userMessage = buildUserMessage(mode, query, contextData, documentText);
  const result = await chatWithGroq(userMessage);

  if (result !== AI_UNAVAILABLE_MESSAGE) {
    if (mode === 'document') {
      await recordDocQuery();
    } else {
      await recordAIQuery();
    }
  }

  return result;
}

function buildUserMessage(
  mode: AIQueryMode,
  query: string,
  contextData?: Record<string, unknown>,
  documentText?: string,
): string {
  const contextStr = contextData
    ? `\n\nAvailable data context:\n${JSON.stringify(contextData, null, 2)}`
    : '';

  switch (mode) {
    case 'general':
      return `User question: ${query}${contextStr}`;
    case 'document':
      return `Analyze the following MIS or document content and answer the user's request using only the supplied content.

Document content:
${documentText || 'Data not available in the uploaded MIS'}

User request:
${query}`;
    case 'insight':
      return `Give a short executive insight using only the supplied data. Mention key numbers when available and call out risks or actions.${contextStr}`;
    case 'comparison':
      return `Compare the requested items using only the supplied data. If the comparison cannot be made from the supplied data, say "Data not available in the uploaded MIS".${contextStr}

Comparison request:
${query}`;
    default:
      return `User question: ${query}${contextStr}`;
  }
}

export async function askSobhaAI(
  query: string,
  contextData?: Record<string, unknown>,
): Promise<string> {
  const isComparison = /\bvs\b|\bcompare\b|\bversus\b|\bdifference\b/i.test(query);

  return queryAI({
    mode: isComparison ? 'comparison' : 'general',
    query,
    contextData,
  });
}

export async function analyzeDocument(
  documentText: string,
  query: string = 'Summarize this document',
): Promise<string> {
  return queryAI({
    mode: 'document',
    query,
    documentText,
  });
}

export async function getPageInsight(
  _pageKey: string,
  contextData: Record<string, unknown>,
): Promise<string> {
  return queryAI({
    mode: 'insight',
    query: 'Provide the top executive insight.',
    contextData,
  });
}

export function generateFollowUps(response: string, _originalQuery: string): string[] {
  const followUps: string[] = [];
  const lower = response.toLowerCase();

  if (lower.includes('collection') || lower.includes('overdue')) {
    followUps.push('Which accounts have the highest overdue amounts?');
  }
  if (lower.includes('sales') || lower.includes('booking')) {
    followUps.push('How does this compare to last month?');
  }
  if (lower.includes('project') || lower.includes('construction') || lower.includes('development')) {
    followUps.push('What are the key risks to the timeline?');
  }
  if (lower.includes('finance') || lower.includes('cost') || lower.includes('profit')) {
    followUps.push('What action should I take next?');
  }

  followUps.push('What should I do about this?');

  return [...new Set(followUps)].slice(0, 3);
}
