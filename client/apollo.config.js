const {BuildFetchUrl} = require("./src/utils/BuildFetchUrl")

  // Build Fetch url
  const FETCH_URL = BuildFetchUrl();

  module.exports = {
  client: {
    service: {
      name: 'my-graphql-app',
      url: `${FETCH_URL}/graphql`,
    },
  },
};
