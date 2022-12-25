import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login  from "../src/components/Login";
import { Register } from "../src/components/Register";
import React, { useState } from "react";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  return (
    <>
      <Router>
        <Header />
        <Container className="mt-3">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Home />} />
          </Routes>
        </Container>
      </Router>

      {
        currentForm === "login" ? <Login/> : <Register/>
      }
    </>
  
    );
}

export default App;
