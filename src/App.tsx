import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./Layout/Layout"
import Overview from "./pages/Overview/Overview"
import Login from "./pages/Login/Login"
import TicketsPage from "./pages/Ticketspage/TicketsPage"
import "./App.css"
import NotFound from "./pages/NotFound/NotFound"
import RequestJob from "./pages/RequestJob/RequestJob"
import MasterData from "./pages/MasterData/MasterData"

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<Overview />} path="/"></Route>
          <Route element={<TicketsPage />} path="/tickets"></Route>
          <Route element={<RequestJob />} path="/request"></Route>
          <Route element={<MasterData />} path="/masterData"></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  )
}

export default App
