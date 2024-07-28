const Flight = require("../models/flight");

const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    console.error("Error fetching flights:", error.message);
    res.status(500).send("Server Error");
  }
};

const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findOne({ flight_id: req.params.id });
    if (!flight) return res.status(404).send("Flight not found");
    res.json(flight);
  } catch (error) {
    console.error("Error fetching flight:", error.message);
    res.status(500).send("Server Error");
  }
};

const addFlight = async (req, res) => {
  const {
    flight_id,
    airline,
    status,
    departure_gate,
    arrival_gate,
    scheduled_departure,
    scheduled_arrival,
    actual_departure,
    actual_arrival,
  } = req.body.body;
  console.log(flight_id);
  try {
    const newFlight = await Flight.create({
      flight_id,
      airline,
      status,
      departure_gate,
      arrival_gate,
      scheduled_departure,
      scheduled_arrival,
      actual_departure,
      actual_arrival,
    });
    res.status(201).json(newFlight);
  } catch (error) {
    console.error("Error adding flight:", error.message);
    res.status(500).send("Server Error");
  }
};

const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!flight) return res.status(404).send("Flight not found");
    res.status(200).json(flight);
  } catch (error) {
    console.error("Error updating flight:", error.message);
    res.status(500).send("Server Error");
  }
};

const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findOneAndDelete({ flight_id: req.params.id });
    if (!flight) {
      return res.status(404).send("Flight not found");
    }
    res.status(200).json({ msg: "Flight Cancelled" });
  } catch (error) {
    console.error("Error deleting flight:", error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getFlights: getFlights,
  getFlightById: getFlightById,
  addFlight: addFlight,
  updateFlight: updateFlight,
  deleteFlight: deleteFlight,
};
