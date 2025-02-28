export const BuildFetchUrl = () => {
  // Pick url depending if component is SSR or CSR (important for docker only)
  const FETCH_URL =
    process.env.API_URL_SERVER || process.env.NEXT_PUBLIC_API_URL;

  // const FETCH_URL = process.env.NEXT_PUBLIC_API_URL;

  // console.log('FETCH URL--->', FETCH_URL);
  // console.log('AUTH_SECRET', process.env.NEXTAUTH_SECRET);
  // console.log('NEXTAUTH_URL', process.env.NEXTAUTH_URL);
  // console.log('API_URL_SERVER', process.env.API_URL_SERVER);
  // console.log('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL);

  return FETCH_URL;
};
