const path = require('path');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '../../dev.sqlite3'),
    },
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '../../dev.sqlite3'),
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME || 'postgres',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || '5432',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
