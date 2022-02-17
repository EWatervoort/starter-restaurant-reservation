/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationsService = require("./reservations.service");

async function list(req, res) {
  const data = await reservationsService.list(req.query.date);
  console.log('heyo', data)
  res.json({ data })
}

async function create(req, res, next) {
  const data = await reservationsService.create(req.body);
  console.log('hoya', data)
  res.status(201).json({ data })
}

function validDate(req, res, next) {
  const date = new Date(req.body.reservation_date)
  const currentDate = new Date()
  const reservationWeekDay = date.getDay();

  if (reservationWeekDay !== 2) {
    if (date-currentDate >= 0) {
        next();
      }
  } else {
    return next({
      status: 400,
      message: `Invalid date. Enter future date that is not on a Tuesday`
    });
  }
}

module.exports = {
  list,
  create: [
    validDate,
    asyncErrorBoundary(create)],
};
