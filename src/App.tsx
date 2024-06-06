import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Checkout from "./pages/Checkout/Checkout";
// import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
