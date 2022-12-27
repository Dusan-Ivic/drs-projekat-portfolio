import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "../index.css";

const notify = () => toast.error("Niste popunili sva polja.");

function Login() {
  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
      notify();
    } else {
      setSubmitted(true);
      setError(false);

      const user = {
        email: email,
        password: password,
      };

      axios.post("http://127.0.0.1:5000/login", user).then(
        (res) => {
          sessionStorage.setItem("user", JSON.stringify(res.data));
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  return (
    <div className="form">
      <div>
        <h1>Login</h1>
      </div>
      <form>
        <label className="label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          type="email"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
        />

        <button onClick={handleSubmit} className="subBtn" type="submit">
          Submit
        </button>
        <Toaster />
      </form>
    </div>
  );
}

export default Login;
