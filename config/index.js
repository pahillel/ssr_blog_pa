const isDev = process.env.NODE_ENV === 'dev';

module.exports = {
  port: Number(process.env.PORT) || 3000,
  secret: 'superSecretKey',
  cookies: {
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  },
  mongo: {
    url: 'mongodb://localhost:27018',
    options: {
      dbName: 'ssr_blog'
    }
  }
};
