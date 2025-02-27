import React, { useState, useEffect } from "react";
import "./Admin.css";
import axios from "../../axios.js";
import { useNavigate } from "react-router-dom";
const Admin = ({ token }) => {
  let navigate = useNavigate();

  const [flights, setFlights] = useState([]);
  const [data, setData] = useState({
    flight_id: "",
    airline: "",
    status: "",
    departure_gate: "",
    arrival_gate: "",
    scheduled_departure: "",
    scheduled_arrival: "",
    actual_departure: "",
    actual_arrival: "",
  });
  const [flightId, setFlightId] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get("/flights");
      console.log(response.data);
      const data = await response.data;
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      var response;
      console.log(JSON.stringify(data));
      if (flightId === null) {
        response = await axios.post("/flights", {
          body: data,
        });
      } else {
        response = await axios.put(`flights/${flightId}`, {
          body: data,
        });
      }

      if (response.status === 201 || response.status === 200) {
        alert(
          flightId ? "Flight updated successfully" : "Flight added successfully"
        );
        fetchFlights();
        setData({
          flight_id: "",
          airline: "",
          status: "",
          departure_gate: "",
          arrival_gate: "",
          scheduled_departure: "",
          scheduled_arrival: "",
          actual_departure: "",
          actual_arrival: "",
        });
        setFlightId(null);
      } else {
        alert("Error saving flight data");
      }
    } catch (error) {
      console.error("Error saving flight data:", error);
      alert("Error saving flight data");
    }
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (flight) => {
    setData({
      flight_id: flight.flight_id,
      airline: flight.airline,
      status: flight.status,
      departure_gate: flight.departure_gate,
      arrival_gate: flight.arrival_gate,
      scheduled_departure: flight.scheduled_departure,
      scheduled_arrival: flight.scheduled_arrival,
      actual_departure: flight.actual_departure,
      actual_arrival: flight.actual_arrival,
    });
    setFlightId(flight._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) {
      return;
    }
    try {
      const response = await axios.delete(`/flights/${id}`);
      if (response.status == 200) {
        alert("Flight deleted successfully");
        fetchFlights();
      } else {
        alert("Error deleting flight");
      }
    } catch (error) {
      alert("Error deleting flight.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="form-title">
          {flightId ? "EDIT FLIGHT" : "ADD FLIGHT"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="flight_id" className="label">
              Flight ID
            </label>
            <input
              type="text"
              id="flight_id"
              name="flight_id"
              value={data.flight_id}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="airline" className="label">
              Airline
            </label>
            <input
              type="text"
              id="airline"
              name="airline"
              value={data.airline}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status" className="label">
              Status
            </label>
            <input
              type="text"
              id="status"
              name="status"
              value={data.status}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="departure_gate" className="label">
              Departure Gate
            </label>
            <input
              type="text"
              id="departure_gate"
              name="departure_gate"
              value={data.departure_gate}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="arrival_gate" className="label">
              Arrival Gate
            </label>
            <input
              type="text"
              id="arrival_gate"
              name="arrival_gate"
              value={data.arrival_gate}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="scheduled_departure" className="label">
              Scheduled Departure
            </label>
            <input
              type="datetime-local"
              id="scheduled_departure"
              name="scheduled_departure"
              value={data.scheduled_departure}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="scheduled_arrival" className="label">
              Scheduled Arrival
            </label>
            <input
              type="datetime-local"
              id="scheduled_arrival"
              name="scheduled_arrival"
              value={data.scheduled_arrival}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="actual_departure" className="label">
              Actual Departure
            </label>
            <input
              type="datetime-local"
              id="actual_departure"
              name="actual_departure"
              value={data.actual_departure}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="actual_arrival" className="label">
              Actual Arrival
            </label>
            <input
              type="datetime-local"
              id="actual_arrival"
              name="actual_arrival"
              value={data.actual_arrival}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <button type="submit" className="button">
            {flightId ? "Update Flight" : "Add Flight"}
          </button>
        </form>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="th">Flight ID</th>
              <th className="th">Airline</th>
              <th className="th">Status</th>
              <th className="th">Departure Gate</th>
              <th className="th">Arrival Gate</th>
              <th className="th">Scheduled Departure</th>
              <th className="th">Scheduled Arrival</th>
              <th className="th">Actual Departure</th>
              <th className="th">Actual Arrival</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr key={flight._id}>
                <td className="td">{flight.flight_id}</td>
                <td className="td">{flight.airline}</td>
                <td className="td">{flight.status}</td>
                <td className="td">{flight.departure_gate}</td>
                <td className="td">{flight.arrival_gate}</td>
                <td className="td">{flight.scheduled_departure}</td>
                <td className="td">{flight.scheduled_arrival}</td>
                <td className="td">{flight.actual_departure}</td>
                <td className="td">{flight.actual_arrival}</td>
                <td className="td">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(flight)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(flight.flight_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
