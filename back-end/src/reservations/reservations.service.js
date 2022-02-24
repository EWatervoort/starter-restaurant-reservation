const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning('*')
    .then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .first();
}

function list(date) {
  return knex("reservations")
    .select("*")
    .where({"reservation_date": date})
}

function updateStatus(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status })
    // .then((updatedRecord) => updatedRecord[0])
}

module.exports = {
  create,
  list,
  read,
  updateStatus,
};