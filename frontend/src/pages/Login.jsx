import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { login, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Spinner from "../components/Spinner";
import { isValidEmail } from "../utils/validators";

const notify = (err) => toast.error(err);

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      notify(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) {
      notify("Email is required");
      return;
    } else if (!isValidEmail(formData.email)) {
      notify("Email is not valid");
      return;
    } else if (!formData.password) {
      notify("Password is required");
      return;
    }

    dispatch(login(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="form">
      <div>
        <h1>Login</h1>
      </div>
      <form onSubmit={onSubmit}>
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          className="input"
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          className="input"
        />

        <button type="submit" className="subBtn">
          Submit
        </button>
        <Toaster />
      </form>
    </div>
  );
}

export default Login;
