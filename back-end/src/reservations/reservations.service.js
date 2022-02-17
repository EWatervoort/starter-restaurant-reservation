const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning('*')
    .then((createdRecords) => createdRecords[0]);
}


function list(date) {
  return knex("reservations")
    .select("*")
    .where({"reservation_date": date})
}

module.exports = {
  create,
  list,
};