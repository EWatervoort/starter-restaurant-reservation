exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.string("table_name");
    table.integer("capacity");
    table.integer("reservation_id").unsigned();
    table
      .foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onDelete("cascade");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tables");
};
