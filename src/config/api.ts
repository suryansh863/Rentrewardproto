// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper function to build API URLs
export const buildApiUrl = (path: string): string => {
  return `${API_BASE_URL}${path}`;
};

// Helper function to handle API responses
export const handleApiResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Invalid content type: ${contentType}`);
  }

  try {
    const text = await response.text();
    console.debug('Raw API response:', {
      status: response.status,
      contentType,
      body: text
    });

    // Check if the response is empty
    if (!text) {
      throw new Error('Empty response from server');
    }

    const data = JSON.parse(text);
    
    // Check if the response follows our expected format
    if (!('success' in data)) {
      console.warn('Response missing success flag:', data);
    }

    return data;
  } catch (error) {
    console.error('API Response Error:', error);
    throw new Error('Invalid response from server');
  }
};

// Helper function to make API requests
export const apiRequest = async (
  path: string,
  options: RequestInit = {}
) => {
  const url = buildApiUrl(path);
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    console.debug('API Request:', {
      url,
      method: options.method || 'GET',
      headers: { ...defaultHeaders, ...options.headers }
    });

    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers }
    });

    const data = await handleApiResponse(response);
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};