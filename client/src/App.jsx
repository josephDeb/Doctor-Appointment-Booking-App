import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "../../backend/models/UserModels";
import UserLogin from "./components/oauth/UserLogin";
import RegisterUser from "./components/oauth/RegisterUser";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/sign-up" element={<RegisterUser />} />

          <Route path="/admin-dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
