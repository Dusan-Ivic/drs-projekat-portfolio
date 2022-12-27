import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login  from "../src/components/Login";
import { Register } from "../src/components/Register";
import React, { useState } from "react";
import Modal from "./components/Modal";


const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

export default function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Router>
        <Header />
        <Container className="mt-3">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Router>
    </> 
    );
}

//export default App;
