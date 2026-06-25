export default () => ({
  app: {
    port: parseInt(process.env.PORT || '5000', 10),
    origins: process.env.CORS_ORIGINS?.split(',') || [],
  },
  database: {
    mongoURI: process.env.MONGO_URI,
  },
  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  },
});
