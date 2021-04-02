exports.up = function (db) {
  return db.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.string('email').unique().notNullable();
    table.string('name').notNullable();
    table.date('date').nullable();
  });
};

exports.down = function (db) {
  return db.schema.dropTable('users');
};
