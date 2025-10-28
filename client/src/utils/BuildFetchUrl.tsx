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
  return process.env.API_URL_SERVER || process.env.NEXT_PUBLIC_API_URL;
};
