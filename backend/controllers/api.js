const router = require("express").Router();
const flight = require("../services/flight.js");

router.get("/flights", flight.getFlights);
router.get("/flights/:id", flight.getFlightById);
router.post("/flights", flight.addFlight);
router.put("/flights/:id", flight.updateFlight);
router.delete("/flights/:id", flight.deleteFlight);

module.exports = router;
