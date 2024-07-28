import React, { useState, useEffect } from "react";
import axios from "../../axios.js";
import { useNavigate } from "react-router-dom";
const Dashboard = ({ token }) => {
  const [flights, setFlights] = useState([]);
  let navigate = useNavigate();

  const fetchFlightData = async () => {
    try {
      const response = await axios.get("/flights");
      console.log(response.data);
      const data = await response.data;
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchFlightData();
  }, []);

  return (
    <div className="container">
      <h1 className="form-title">Flight Status</h1>
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
              <td className="td">
                {new Date(flight.scheduled_departure).toLocaleString()}
              </td>
              <td className="td">
                {new Date(flight.scheduled_arrival).toLocaleString()}
              </td>
              <td className="td">
                {flight.actual_departure
                  ? new Date(flight.actual_departure).toLocaleString()
                  : "N/A"}
              </td>
              <td className="td">
                {flight.actual_arrival
                  ? new Date(flight.actual_arrival).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
