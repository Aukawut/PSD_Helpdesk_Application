import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./Layout/Layout"
import Overview from "./pages/Overview/Overview"
import Login from "./pages/Login/Login"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Overview />} path="/"></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Login />}></Route>
      </Routes>
    </Router>
  )
}

export default App
