
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AngGaling from "./components/oauth/AngGaling"

function App() {

  return (
    <>
      <Router>
          <Routes>
              {/*Oauth*/}
              <Route path="/" element={<AngGaling />}>

              </Route>
          </Routes>
      </Router>
    </>
  )
}

export default App
