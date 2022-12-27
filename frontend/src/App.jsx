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
            <Route exact path="/register" element={<Home />} />
          </Routes>
        </Container>
      </Router>

      {
        currentForm === "login" ? <Login/> : <Register/>
      }

      <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          Fancy Modal
        </Modal>
      </div>
    </>
  
    );
}

//export default App;
