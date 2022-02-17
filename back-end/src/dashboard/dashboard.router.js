const controller = require('./dashboard.controller');
const router = require("express").Router();

router.route("/").get(controller.read);

module.exports = router;