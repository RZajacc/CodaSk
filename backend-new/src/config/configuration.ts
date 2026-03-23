export default () => ({
  app: {
    port: parseInt(process.env.PORT || '5000', 10),
  },
  database: {
    mongoURI: process.env.MONGO_URI,
  },
});
