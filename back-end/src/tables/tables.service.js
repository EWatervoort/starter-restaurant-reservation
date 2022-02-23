const knex = require("../db/connection");

function create(table) {
  return knex("tables")
    .insert(table)
    .returning('*')
    .then((createdRecords) => createdRecords[0]);
}

function list() {
  return knex("tables")
    .select("*")
}

function read(table_id) {
  return knex("tables")
    .select("*")
    .where({ table_id })
    .first();
}

function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
    // .then((updatedRecords) => updatedRecords[0]);
}

function deleteTable(table_id, reservation_id) {
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id: null })
    .returning("*")
}

module.exports = {
  create,
  list,
  read,
  update,
  deleteTable,
}