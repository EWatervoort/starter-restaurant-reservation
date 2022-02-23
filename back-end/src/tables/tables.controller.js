const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

// Check that the form has submited all the needed properties.
const hasRequiredProperties = hasProperties("table_name", "capacity");
const hasUpdateRequiredProperties = hasProperties("reservation_id");


function tableNameLength(req, res, next) {
  const table_name = req.body.data.table_name;
  if (table_name.length >= 2) {
    return next();
  }
  return next({
    status: 400,
    message: `table_name`,
  });
}

function capacityNumber(req, res, next) {
  const capacity = parseInt(req.body.data.capacity);
  if (capacity >= 1) {
    return next();
  }
  return next({
    status: 400,
    message: `capacity`,
  });
}

function capacityIsNumber(req, res, next) {
  const capacity = req.body.data.capacity;
  if (typeof(capacity) === "number") {
    return next();
  }
  return next({
    status: 400,
    message: `capacity`,
  });
}

async function list(req, res) {
  const data = await tablesService.list(req.query.date);

  data.sort((a, b) => {
    if (a.table_name.toLowerCase() < b.table_name.toLowerCase()) {
      return -1;
    }
    if (a.table_name.toLowerCase() > b.table_name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  res.json({ data });
}

async function create(req, res, next) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  return next({
    status: 400,
    message: `Table cannot be found`,
  });
}

async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(
    req.body.data.reservation_id
  );
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: `999 reservation cannot be found`,
  });
}

async function update(req, res, next) {
  const updatedTable = {
    ...res.locals.table,
    reservation_id: req.body.data.reservation_id,
  };
  const data = await tablesService.update(updatedTable);
  res.json({ data });
}

function largeEnoughTable(req, res, next) {
  const reservation = res.locals.reservation;
  const capacity = res.locals.table.capacity;
  if (parseInt(reservation.people) > parseInt(capacity)) {
    return next({
      status: 400,
      message: `Choose a table with a larger capacity`,
    });
  }
  return next();
}

function occupied(req, res, next) {
  const table = res.locals.table;
  console.log('table', table)
  if (!table.reservation_id) {
   return next();
  }
  return next({
    status: 400,
    message: `Table is occupied`,
  });
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    tableNameLength,
    capacityNumber,
    capacityIsNumber,
    asyncErrorBoundary(create),
  ],
  list,
  update: [
    asyncErrorBoundary(tableExists),
    hasOnlyValidProperties,
    hasUpdateRequiredProperties,
    asyncErrorBoundary(reservationExists),
    largeEnoughTable,
    occupied,
    asyncErrorBoundary(update),
  ],
};
