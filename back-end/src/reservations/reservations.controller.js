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

  const { data = {} } = req.body

  const invalidFields = Object.keys(data).filter((field) => !VALID_PROPERTIES.includes(field));
  console.log(invalidFields)

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`
    });
  };
  next();
}

// Check that the form has submited all the needed properties.
const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number",
"reservation_date", "reservation_time", "people");

function isDate(req, res, next) {
  const date = req.body.data.reservation_date
  const testDate = new Date(date);
  if (testDate instanceof Date && !isNaN(testDate)) {
    return next()
  }
  return next({
    status:400,
    message: `Invalid date`
  })
}


async function list(req, res) {
  const data = await reservationsService.list(req.query.date);
  res.json({ data })
}

async function create(req, res, next) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data })
}

function validDate(req, res, next) {
  // Start by adding the reservation date and then the reservation time.
  const date = new Date(req.body.data.reservation_date)
  const time = req.body.data.reservation_time

  const hour = parseInt(time.substring(0,2))
  const min = parseInt(time.substring(3))

//  Add the reservation time to see if it is later than the current time
  date.setMinutes(min+(hour*60))

  // Correct the timezone for the day of the week
  const timeZoneDate = new Date(date)
  timeZoneDate.setHours(timeZoneDate.getHours()+7)
 
  const currentDate = new Date()
  const reservationWeekDay = timeZoneDate.getDay();
  currentDate.setHours(currentDate.getHours()-7)

// Check to see if the reservation day is on a tuesday or if the date is in the past.

  if (reservationWeekDay !== 2 && date-currentDate >= 0) {
    next();
  } else {
    return next({
      status: 400,
      message: `Invalid date. Enter future date that is not on a Tuesday`
    });
  }
}

function validTime(req, res, next) {
  // Check to see if the reservation time is between 1030am and 930pm
  const time = req.body.data.reservation_time
  const hour = parseInt(time.substring(0,2))
  const min = parseInt(time.substring(3))

  if (hour===10 && min>=30 || hour > 10) {
    if (hour===21 && min<=30 || hour < 21) {
      return next();
    }
  }
  return next ({
    status: 400,
    message: `Invalid time. Enter a time between 10:30am and 9:30pm`
    })

}

module.exports = {
  list,
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    isDate,
    validDate,
    validTime,
    asyncErrorBoundary(create)],
};
