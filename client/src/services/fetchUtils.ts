const API_BASE_URL = import.meta.env.VITE_API_URL;

async function fetchWithAuth<T>(url: string, options: RequestInit): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    credentials: 'include',
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error!, Status: ${response.status}`);
  }

  return response.json();
}

async function refreshAccessToken() {
  try {
    const response = await fetch(API_BASE_URL + '/auth/refresh', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(
        `Failed to refresh access token! Status: ${response.status}`
      );
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchWithAuthAndRefresh<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  try {
    return await fetchWithAuth<T>(url, options);
  } catch (error) {
    if (error instanceof Error && error.message.includes('401')) {
      try {
        await refreshAccessToken();

        return fetchWithAuth<T>(url, options);
      } catch (refreshError) {
        throw refreshError;
      }
    }
    throw error;
  }
}
