require('dotenv').config();

module.exports = {
  development: {
    url: process.env.POSTGRES_URI,
    dialect: 'postgres',
    logging: console.log,
  },
  test: {
    url: process.env.POSTGRES_URI_TEST,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: process.env.POSTGRES_URI,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};