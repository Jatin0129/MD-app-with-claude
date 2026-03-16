import { AI_CONFIG, AI_UNAVAILABLE_MESSAGE, SOBHA_SYSTEM_PROMPT } from '../../config/ai';
import { OPENROUTER_API_KEY } from '../../config/secrets';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatChoice {
  message?: { content?: string };
}

interface ChatResponse {
  choices?: ChatChoice[];
  error?: { message: string };
}

export async function chatWithGroq(userMessage: string): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    return 'AI not configured. Add EXPO_PUBLIC_OPENROUTER_API_KEY to your .env file and restart.';
  }

  try {
    const messages: ChatMessage[] = [
      { role: 'system', content: SOBHA_SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ];

    const response = await fetch(AI_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://sobha-md-app.local',
        'X-Title': 'Sobha MD App',
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        temperature: 0.2,
        max_tokens: 800,
        messages,
      }),
    });

    if (!response.ok) {
      let errorMsg = `Status ${response.status}`;
      try { errorMsg += `: ${await response.text()}`; } catch { /* ignore */ }
      console.error('OpenRouter API error:', errorMsg);
      if (response.status === 401) {
        return 'API key invalid. Update EXPO_PUBLIC_OPENROUTER_API_KEY in .env and restart.';
      }
      return AI_UNAVAILABLE_MESSAGE;
    }

    const data = (await response.json()) as ChatResponse;

    if (data.error) {
      console.error('OpenRouter error:', data.error.message);
      return AI_UNAVAILABLE_MESSAGE;
    }

    const content = data.choices?.[0]?.message?.content?.trim();
    return content || AI_UNAVAILABLE_MESSAGE;
  } catch (e) {
    console.error('OpenRouter exception:', e);
    return AI_UNAVAILABLE_MESSAGE;
  }
}
