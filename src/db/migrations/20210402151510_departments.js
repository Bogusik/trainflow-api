exports.up = function (db) {
  return db.schema.createTable('departments', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.integer('chief_id').unsigned();
    table.foreign('chief_id').references('employees.id');
  });
};

exports.down = function (db) {
  return db.schema.dropTable('departments');
};
