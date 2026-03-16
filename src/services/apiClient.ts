import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const MAX_RETRIES = 2;
const TIMEOUT = 10000;

function createApiClient(): AxiosInstance {
  const client = axios.create({
    timeout: TIMEOUT,
  });

  // Request interceptor — logging
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const url = config.url ?? '';
      // Mask API keys in logs
      const cleanUrl = url.replace(/apikey=[^&]+/, 'apikey=***');
      console.log(`[API] ${config.method?.toUpperCase()} ${cleanUrl}`);
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor — error handling + retry
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as InternalAxiosRequestConfig & { _retryCount?: number };
      if (!config) return Promise.reject(error);

      config._retryCount = config._retryCount ?? 0;

      const isNetworkError = !error.response;
      const isServerError = error.response && error.response.status >= 500;

      if ((isNetworkError || isServerError) && config._retryCount < MAX_RETRIES) {
        config._retryCount += 1;
        console.log(`[API] Retry ${config._retryCount}/${MAX_RETRIES} for ${config.url}`);
        // Exponential backoff: 1s, 2s
        await new Promise((r) => setTimeout(r, config._retryCount! * 1000));
        return client(config);
      }

      const message =
        error.response?.status === 429
          ? 'Rate limit exceeded. Please wait before retrying.'
          : error.response
            ? `API error: ${error.response.status} ${error.response.statusText}`
            : 'Network error. Please check your connection.';

      console.error(`[API] ${message}`, error.config?.url);
      return Promise.reject(new Error(message));
    }
  );

  return client;
}

export const apiClient = createApiClient();
