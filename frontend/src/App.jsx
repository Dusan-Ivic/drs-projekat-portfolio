import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import React from "react";
import Currencies from "./pages/Currencies";
//import Coin from "./components/Coin";
import Info from "./pages/Info";
import CreateTransactions from "./pages/CreateTransaction";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container className="mt-3">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route exact path="/profile" element={<Profile />} />

            <Route path="/profile/edit" element={<EditProfile />} />
            <Route exact path="/currencies" element={<Currencies />} />
            <Route path="/coin/:id" element={<Info />} />

            <Route exact path="/portfolio" element={<Portfolio />} />
            <Route
              path="/transactions/create"
              element={<CreateTransactions />}
            />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
