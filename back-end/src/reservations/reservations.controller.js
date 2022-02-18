/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationsService = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function hasOnlyValidProperties(req,res,next) {

  const invalidFields = Object.keys(req.body).filter((field) => !VALID_PROPERTIES.includes(field));

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`
    });
  };
  next();
}

const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number",
"reservation_date", "reservation_time", "people");

async function list(req, res) {
  const data = await reservationsService.list(req.query.date);
  res.json({ data })
}

async function create(req, res, next) {
  const data = await reservationsService.create(req.body);
  res.status(201).json({ data })
}

function validDate(req, res, next) {
  // Start by adding the reservation date and then the reservation time.
  const date = new Date(req.body.reservation_date)
  const time = req.body.reservation_time

  const hour = parseInt(time.substring(0,2))
  const min = parseInt(time.substring(3))

  date.setMinutes(min+(hour*60))
 
  const currentDate = new Date()
  const reservationWeekDay = date.getDay();
  currentDate.setHours(currentDate.getHours()-7)

// Check to see if the reservation day is on a tuesday or if the date is in the past.

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
    hasOnlyValidProperties,
    hasRequiredProperties,
    validDate,
    asyncErrorBoundary(create)],
};
