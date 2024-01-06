
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AngGaling from "./components/oauth/AngGaling"
import Login from "./components/oauth/Login"

function App() {

  return (
    <>
      <Router>
          <Routes>
              {/*Oauth*/}
              <Route path="/" element={<AngGaling />}/>
              <Route path="/login" element={<Login />}/>
          </Routes>
      </Router>
    </>
  )
}

export default App
