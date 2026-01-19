/**
 * Function to construct the base URL for making fetch API requests.
 *
 * Retrieves the server API URL from environment variables.
 * It prioritizes the server-side API URL (`process.env.API_URL_SERVER`),
 * and if unavailable, falls back to the client-side public API URL (`process.env.NEXT_PUBLIC_API_URL`).
 *
 * @returns {string | undefined} The base URL for the API, or undefined if none is set.
 */
export const BuildFetchUrl = (): string | undefined => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return process.env.API_URL_SERVER || 'http://backend-dev:5008';
  }

  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5008';
};
