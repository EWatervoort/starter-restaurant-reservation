const service = require("./dashboard.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function read(req, res, next) {
  const { reservation : data } = res.locals
  res.json({ data })
}

module.exports = {
  read,
}