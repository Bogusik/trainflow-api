exports.up = function (db) {
  return db.schema.createTable('employees', (table) => {
    table.increments('id');
    table.date('me_date').notNullable();
    table.integer('crew_id').unsigned();
    table.foreign('crew_id').references('crews.id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.integer('type_id').unsigned();
    table.foreign('type_id').references('employee_types.id');
  });
};

exports.down = function (db) {
  return db.schema.dropTable('employees');
};
