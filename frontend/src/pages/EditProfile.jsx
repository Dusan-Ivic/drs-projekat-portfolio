import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { editProfile } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Spinner from "../components/Spinner";
import { isValidEmail } from "../utils/validators";

const notify = (err) => toast.error(err);

const EditProfile = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: user.data.firstName,
    lastName: user.data.lastName,
    address: user.data.address,
    city: user.data.city,
    country: user.data.country,
    phone: user.data.phone,
    email: user.data.email,
    password: user.data.password,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName) {
      notify("First name is required");
      return;
    } else if (!formData.lastName) {
      notify("Last name is required");
      return;
    } else if (!formData.email) {
      notify("Email is required");
      return;
    } else if (!isValidEmail(formData.email)) {
      notify("Email is not valid");
      return;
    } else if (!formData.password) {
      notify("Password is required");
      return;
    } else if (formData.password.length < 6) {
      notify("Password should contain at least 6 characters");
      return;
    } else if (!formData.address) {
      notify("Address is required");
      return;
    } else if (!formData.city) {
      notify("City is required");
      return;
    } else if (!formData.country) {
      notify("Country is required");
      return;
    } else if (!formData.phone) {
      notify("Phone is required");
      return;
    }

    dispatch(editProfile(formData));

    navigate("/profile");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <label className="label">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          className="input"
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          className="input"
        />

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

        <label className="label">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
          className="input"
        />

        <label className="label">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={onChange}
          className="input"
        />

        <label className="label">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={onChange}
          className="input"
        />

        <label className="label">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
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
};

export default EditProfile;
