const client = require('knex');
const configurations = require('./conf');

if (process.env.ENV === 'prod') {
  module.exports = client(configurations.production);
} else if (process.env.ENV === 'dev') {
  module.exports = client(configurations.development);
} else {
  module.exports = client(configurations.test);
}
