import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container className="mt-3">
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
