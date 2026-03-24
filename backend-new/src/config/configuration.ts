export default () => ({
  app: {
    port: parseInt(process.env.PORT || '5000', 10),
    origins: process.env.CORS_ORIGINS?.split(',') || [],
  },
  database: {
    mongoURI: process.env.MONGO_URI,
  },
});
