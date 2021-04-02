exports.up = function (db) {
  return db.schema.createTable('crews', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.json('schedule').nullable();
    table.integer('department_id').unsigned();
    table.foreign('department_id').references('department_id.id');
  });
};

exports.down = function (db) {
  return db.schema.dropTable('crews');
};
