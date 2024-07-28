import Admin from "./Components/AdminPage/Admin";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/dashboard" element={<Dashboard token={token} />} />
          <Route path="/admin" element={<Admin token={token} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
