import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { logout, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Portfolio Project
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/portfolio">
                    Portfolio
                  </Nav.Link>
                  <Nav.Link as={Link} to="/transactions/create">
                    Create Transaction
                  </Nav.Link>
                  <Nav.Link as={Link} to="/currencies">
                    Currencies
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
