const {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  TEST_DATABASE_URL,
  API_TOKEN,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASS,
  DB_USER,
  DB_DRIVER,
} = process.env;

module.exports = {
  PORT: PORT || 8000,
  NODE_ENV,
  DATABASE_URL,
  TEST_DATABASE_URL,
  API_TOKEN,
  dbConfig: {
    DEVELOPMENT: {
      DB_DRIVER,
      DB_HOST,
      DB_PASS,
      DB_PORT,
      DB_USER,
      DB_NAME,
    },
  },
};
