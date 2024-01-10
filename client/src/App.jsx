import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "../../backend/models/UserModels";
import UserLogin from "./components/oauth/UserLogin";
import RegisterUser from "./components/oauth/RegisterUser";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/sign-up" element={<RegisterUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
