const { Sequelize } = require('sequelize');
const user = require('./models/user.model');

let db;

if (process.env.ENV === 'prod') {
  db = new Sequelize(
    process.env.DB_NAME || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'postgres',
    {
      host: process.env.DB_HOST || 'postgres',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: false,
    },
  );
} else {
  db = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
    omitNull: false,
    logging: false,
  });
}

const modelDefiners = [user];

/* eslint-disable-next-line */
for (const modelDefiner of modelDefiners) {
  modelDefiner(db);
}

module.exports = db;
