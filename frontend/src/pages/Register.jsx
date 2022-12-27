import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "../index.css";

const notify = () => toast.error("Niste popunili sva polja.");

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phoneN, setPhoneN] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    setSubmitted(false);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setSubmitted(false);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    setSubmitted(false);
  };

  const handlePhoneN = (e) => {
    setPhoneN(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      lastName === "" ||
      address === "" ||
      city === "" ||
      country === "" ||
      phoneN === ""
    ) {
      setError(true);
      notify();
    } else {
      setSubmitted(true);
      setError(false);

      const user = {
        firstName: name,
        lastName: lastName,
        address: address,
        city: city,
        country: country,
        phone: phoneN,
        email: email,
        password: password,
      };

      axios.post("http://127.0.0.1:5000/api/users", user).then(
        (res) => {
          // sessionStorage.setItem("user", JSON.stringify(res.data));
          console.log(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };
  //TO DO : Error handler za submit kod registracije.
  //TO DO : Custom msg i border oko polja za svaki tip greske.
  //TO DO : Redirect nakon uspesne registracije.

  return (
    <>
      <div>
        <h1>Register</h1>
      </div>
      <form>
        {/* Labels and inputs for form data */}
        <label className="label">First Name</label>
        <input
          onChange={handleName}
          className="input"
          value={name}
          type="text"
        />

        <label className="label">Last Name</label>
        <input
          onChange={handleLastName}
          className="input"
          value={lastName}
          type="text"
        />

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

        <label className="label">Address</label>
        <input
          onChange={handleAddress}
          className="input"
          value={address}
          type="text"
        />

        <label className="label">City</label>
        <input
          onChange={handleCity}
          className="input"
          value={city}
          type="text"
        />

        <label className="label">Country</label>
        <input
          onChange={handleCountry}
          className="input"
          value={country}
          type="text"
        />

        <label className="label">Phone Number</label>
        <input
          onChange={handlePhoneN}
          className="input"
          value={phoneN}
          type="text"
        />

        <button onClick={handleSubmit} className="subBtn" type="submit">
          Submit
        </button>
        <Toaster />
      </form>
    </>
  );
};

export default Register;
