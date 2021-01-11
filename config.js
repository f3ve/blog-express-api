module.exports = {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || 'DEV-JWT-SECRET',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
