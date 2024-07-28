import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios.js";

const Login = ({ setToken }) => {
  var authToken = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (authToken) {
      if (authToken.isadmin === true) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [isadmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    console.log(isadmin);
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
        number,
        isadmin,
      });

      if (response.status === 200) {
        alert("Login successful");
        localStorage.setItem("token", JSON.stringify(response.data));
        const token = localStorage.getItem("token");
        setToken(JSON.stringify(response.data));

        if (isadmin === true) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else if (response.status === 400) {
        alert("Invalid Credentials");
      } else {
        alert("Internal Server Error");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="form-title">Signup/Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="flight_id" className="label">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="number" className="label">
              Phone number
            </label>
            <input
              type="number"
              id="number"
              name="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="admin" className="label">
              Admin
            </label>
            <select
              onChange={(e) =>
                setIsAdmin(e.target.value === "true" ? true : false)
              }
              value={isadmin ? "true" : "false"}
              required
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <button type="submit" className="button">
            Let's Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
