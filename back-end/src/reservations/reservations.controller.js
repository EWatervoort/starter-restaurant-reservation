/**
 * List handler for reservation resources
 */
const reservationsService = require("./reservatopms.service")
async function list(req, res) {
  res.json({
    data: [],
  });
}

function create(req, res, next) {
  reservationsService
    .create(req.body.data)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

module.exports = {
  list,
  create,
};
