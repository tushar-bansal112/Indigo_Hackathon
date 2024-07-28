const router = require("express").Router();
const flight = require("../services/flight.js");
const user = require("../services/user.js");

router.get("/flights", flight.getFlights);
router.get("/flights/:id", flight.getFlightById);
router.post("/flights", flight.addFlight);
router.put("/flights/:id", flight.updateFlight);
router.delete("/flights/:id", flight.deleteFlight);

router.post("/login", user.login);
module.exports = router;
