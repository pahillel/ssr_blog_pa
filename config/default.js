module.exports = {
  port: Number(process.env.PORT) || 3000,
  secret: process.env.TOKEN_SECRET,
  cookies: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    sameSite: 'strict'
  },
  mongo: {
    uri: process.env.DB_URI,
    dbName: process.env.DB_NAME
  }
};
