exports.up = function (db) {
  return db.schema.createTable('employee_types', (table) => {
    table.increments('id');
    table.string('name').notNullable();
  });
};

exports.down = function (db) {
  return db.schema.dropTable('employee_types');
};
